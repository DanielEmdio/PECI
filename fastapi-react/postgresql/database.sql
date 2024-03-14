--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: personal_trainers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_trainers (
    id integer NOT NULL,
    username text,
    password text,
    token text,
    name text,
    description text,
    tags text,
    photo text,
    price text,
    slots integer,
    lang text,
    hours text,
    rating text,
    n_comments text,
    education text,
    bg text,
    email text
);


ALTER TABLE public.personal_trainers OWNER TO postgres;

--
-- Name: PTs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.personal_trainers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PTs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    password text,
    token text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    user_id integer,
    personal_trainer_id integer
);


ALTER TABLE public.chats OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_id_seq OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    chat_id integer,
    sent_by_user boolean,
    text character varying
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    user_id integer NOT NULL,
    personal_trainer_id integer NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    videopath text,
    videoname text,
    description text,
    muscletargets text,
    releasedate text,
    restricted integer,
    personal_trainer_id integer,
    thumbnail text,
    rating text,
    duration text,
    dificulty text
);


ALTER TABLE public.videos OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, user_id, personal_trainer_id) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, chat_id, sent_by_user, text) FROM stdin;
\.


--
-- Data for Name: personal_trainers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_trainers (id, username, password, token, name, description, tags, photo, price, slots, lang, hours, rating, n_comments, education, bg, email) FROM stdin;
18	uni	123	\N	UA	Get your workout done in the comfort of your home	Professional, Flexibliity	ua.png	25€ - monthly	10	\N	\N	\N	\N	\N	\N	uni@ua.pt
1	igor	123	\N	UA2	Get consistent	Calisthenics	igor.png	30€ - monthly	5	\N	\N	\N	\N	\N	\N	igor@hotmail.com
42	chris	123	\N	UA3	Weight lifting and calisthenics is where i shine	Calisthenics,Weight Lifting	chris_heria.png	40€ - monthly	7	\N	\N	\N	\N	\N	\N	chris@gmail.com
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (user_id, personal_trainer_id) FROM stdin;
2	1
3	18
2	18
5	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, token) FROM stdin;
5	gabriel	123	z2rRdEY0sfpK
3	user2	aA1!00000000	abc
9	user3	aA1!00000000	\N
2	user1	aA1!00000000	9y9UCK4HKqwN
10	user4	aA1!00000000	s0rX9BfkXMq6
\.


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.videos (id, videopath, videoname, description, muscletargets, releasedate, restricted, personal_trainer_id, thumbnail, rating, duration, dificulty) FROM stdin;
4	uatreino1.mp4	Full body workout	Good workout for beginners	Upper,Lower 	January 25, 2023	0	18	thumbnails/uatreino1.png	4	\N	3
5	uatreino3.mp4	Leg day	A legs focused workout with some abs in between	Legs,Abs	May 13, 2023	1	18	thumbnails/uatreino3.png	3	\N	4
6	uatreino2.mp4	Upper body workout	A good all-around upper body target workout	Biceps,Triceps,Chest,Shoulders	February 7, 2023	1	18	thumbnails/uatreino2.png	5	\N	2
3	uatreino6.mp4	arms workout	Do This to Get ARMS | Home Workout Challenge\n\nNext Workout Challenge: \nhttps://nextworkoutchallenge.com/\n\nFull Free Home Workout Programs: http://igorvoitenko.com/getfit-programm\nMy Instagram:   / igorvoitenkofitness  \n\nAlso check out my best videos: \n\n7 push up mistakes that are killing your gains:    • 7 WORST Push Up Mistakes Killing Your...  \nDiet for fat loss:    • Eat Like This Every Day to Lose Belly...  \n\nMusic: NCS, Neffex	Biceps,Triceps	November 2, 2023	0	1	thumbnails/uatreino6.png	2	\N	4
1	uatreino4.mp4	Wider back workout	Pull ups challenge to widen your back	Back	September 14, 2023	1	1	thumbnails/uatreino4.png	1	\N	1
2	uatreino5.mp4	The Yuri Boyka Workout	Arms killer workout	Biceps,Triceps,Chest	June 29, 2022	1	1	thumbnails/uatreino5.png	3	\N	2
\.


--
-- Name: PTs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PTs_id_seq"', 43, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 12, true);


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 6, true);


--
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: personal_trainers id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_trainers
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (user_id, personal_trainer_id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: ix_chats_personal_trainer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_chats_personal_trainer_id ON public.chats USING btree (personal_trainer_id);


--
-- Name: ix_chats_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_chats_user_id ON public.chats USING btree (user_id);


--
-- Name: ix_messages_chat_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_messages_chat_id ON public.messages USING btree (chat_id);


--
-- Name: ix_messages_sent_by_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_messages_sent_by_user ON public.messages USING btree (sent_by_user);


--
-- Name: ix_messages_text; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_messages_text ON public.messages USING btree (text);


--
-- Name: chats chats_personal_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_personal_trainer_id_fkey FOREIGN KEY (personal_trainer_id) REFERENCES public.personal_trainers(id);


--
-- Name: chats chats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id);


--
-- Name: videos personal_trainer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT personal_trainer_id FOREIGN KEY (personal_trainer_id) REFERENCES public.personal_trainers(id) NOT VALID;


--
-- Name: subscriptions subscriptions_personal_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_personal_trainer_id_fkey FOREIGN KEY (personal_trainer_id) REFERENCES public.personal_trainers(id);


--
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--
