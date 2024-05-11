--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.11 (Ubuntu 14.11-0ubuntu0.22.04.1)

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
-- Name: athlete_weight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.athlete_weight (
    id integer NOT NULL,
    date date NOT NULL,
    weight integer
);


ALTER TABLE public.athlete_weight OWNER TO postgres;

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


ALTER TABLE public.chats_id_seq OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: common_mistake; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.common_mistake (
    id integer NOT NULL,
    path text,
    description text
);


ALTER TABLE public.common_mistake OWNER TO postgres;

--
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    id integer NOT NULL,
    path text,
    name text,
    description text,
    muscletargets text,
    dificulty text,
    common_mistake_id integer
);


ALTER TABLE public.exercise OWNER TO postgres;

--
-- Name: exercise_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_progress (
    id integer NOT NULL,
    user_id integer,
    date text
);


ALTER TABLE public.exercise_progress OWNER TO postgres;

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


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: reps_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reps_progress (
    id integer NOT NULL,
    exercise_id integer,
    set_num integer,
    reps_made integer,
    weight_used integer
);


ALTER TABLE public.reps_progress OWNER TO postgres;

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
    videopath character varying,
    videoname character varying,
    description character varying,
    muscletargets character varying,
    releasedate character varying,
    restricted integer,
    thumbnail character varying,
    rating character varying,
    duration character varying,
    dificulty character varying,
    personal_trainer_id integer
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


ALTER TABLE public.videos_id_seq OWNER TO postgres;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout (
    id integer NOT NULL,
    title text,
    tags text,
    premium integer,
    thumbnail text,
    releasedate date,
    duration text,
    rating text,
    personal_trainer_id integer
);


ALTER TABLE public.workout OWNER TO postgres;

--
-- Name: workout_exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout_exercise (
    workout_id integer NOT NULL,
    exercise_id integer NOT NULL
);


ALTER TABLE public.workout_exercise OWNER TO postgres;

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
-- Data for Name: athlete_weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.athlete_weight (id, date, weight) FROM stdin;
5	2022-02-10	60
5	2022-05-12	65
3	2024-05-06	67
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, user_id, personal_trainer_id) FROM stdin;
1	5	1
2	2	1
\.


--
-- Data for Name: common_mistake; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.common_mistake (id, path, description) FROM stdin;
1	mistake1.png	Cuidado com os Braços!
\.


--
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise (id, path, name, description, muscletargets, dificulty, common_mistake_id) FROM stdin;
4	uatreino1.mp4	Glute bridge	Good workout for beginners	Upper,Lower 	4	1
5	uatreino3.mp4	Squats	A legs focused workout with some abs in between	Legs,Abs	3	1
3	uatreino6.mp4	Biceps curls	Do This to Get ARMS | Home Workout Challenge\n\nNext Workout Challenge: \nhttps://nextworkoutchallenge.com/\n\nFull Free Home Workout Programs: http://igorvoitenko.com/getfit-programm\nMy Instagram:   / igorvoitenkofitness  \n\nAlso check out my best videos: \n\n7 push up mistakes that are killing your gains:    • 7 WORST Push Up Mistakes Killing Your...  \nDiet for fat loss:    • Eat Like This Every Day to Lose Belly...  \n\nMusic: NCS, Neffex	Biceps,Triceps	2	1
1	uatreino4.mp4	Push ups	Pull ups challenge to widen your back	Back	1	1
2	uatreino5.mp4	Triceps extensions	Arms killer workout	Biceps,Triceps,Chest	2	1
6	uatreino2.mp4	Explosive push ups	A good all-around upper body target workout	Biceps,Triceps,Chest,Shoulders	4	1
\.


--
-- Data for Name: exercise_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_progress (id, user_id, date) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, chat_id, sent_by_user, text) FROM stdin;
1	1	t	dsadas
2	1	t	watup
\.


--
-- Data for Name: personal_trainers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_trainers (id, username, password, token, name, description, tags, photo, price, slots, lang, hours, rating, n_comments, education, bg, email) FROM stdin;
42	chris	123	\N	UA3	Weight lifting and calisthenics is where i shine	Calisthenics,Weight Lifting	chris_heria.png	40€ - monthly	7	\N	\N	\N	\N	\N	\N	chris@gmail.com
1	igor	123	q3O4kkRbmvD1	UA2	Get consistent	Calisthenics	igor.png	30€ - monthly	5	\N	\N	\N	\N	\N	\N	igor@hotmail.com
18	uni	123	otOKrBPN1Ep1	UA	Get your workout done in the comfort of your home	Professional, Flexibliity	ua.png	25€ - monthly	10	\N	\N	\N	\N	\N	\N	uni@ua.pt
\.


--
-- Data for Name: reps_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reps_progress (id, exercise_id, set_num, reps_made, weight_used) FROM stdin;
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptions (user_id, personal_trainer_id) FROM stdin;
2	1
3	18
2	18
5	1
10	18
10	1
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

COPY public.videos (id, videopath, videoname, description, muscletargets, releasedate, restricted, thumbnail, rating, duration, dificulty, personal_trainer_id) FROM stdin;
\.


--
-- Data for Name: workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workout (id, title, tags, premium, thumbnail, releasedate, duration, rating, personal_trainer_id) FROM stdin;
3	private workout 18	Glutes, Abs	1	thumbnails/uatreino2.png	2023-02-07	45 min	4	18
4	private workout 1	Biceps, Triceps	1	thumbnails/uatreino5.png	2022-06-29	45 min	3	1
2	Upper Body	Weight lifting, Calisthenics	0	thumbnails/uatreino4.png	2023-09-14	30 min	3	1
1	Leg killer	Calisthenics	0	thumbnails/uatreino1.png	2023-01-25	20 min	2	18
\.


--
-- Data for Name: workout_exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workout_exercise (workout_id, exercise_id) FROM stdin;
2	1
3	2
3	3
4	6
1	5
4	4
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

SELECT pg_catalog.setval('public.chats_id_seq', 2, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 2, true);


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.videos_id_seq', 1, false);


--
-- Name: athlete_weight PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.athlete_weight
    ADD CONSTRAINT "PK" PRIMARY KEY (id, date);


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
-- Name: common_mistake common_mistake_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.common_mistake
    ADD CONSTRAINT common_mistake_pkey PRIMARY KEY (id);


--
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (id);


--
-- Name: exercise_progress exercise_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_progress
    ADD CONSTRAINT exercise_progress_pkey PRIMARY KEY (id);


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
-- Name: reps_progress reps_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reps_progress
    ADD CONSTRAINT reps_progress_pkey PRIMARY KEY (id);


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
-- Name: workout_exercise workout_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT workout_exercise_pkey PRIMARY KEY (workout_id, exercise_id);


--
-- Name: workout workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_pkey PRIMARY KEY (id);


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
-- Name: ix_videos_description; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_description ON public.videos USING btree (description);


--
-- Name: ix_videos_dificulty; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_dificulty ON public.videos USING btree (dificulty);


--
-- Name: ix_videos_duration; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_duration ON public.videos USING btree (duration);


--
-- Name: ix_videos_muscletargets; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_muscletargets ON public.videos USING btree (muscletargets);


--
-- Name: ix_videos_personal_trainer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_personal_trainer_id ON public.videos USING btree (personal_trainer_id);


--
-- Name: ix_videos_rating; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_rating ON public.videos USING btree (rating);


--
-- Name: ix_videos_releasedate; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_releasedate ON public.videos USING btree (releasedate);


--
-- Name: ix_videos_restricted; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_restricted ON public.videos USING btree (restricted);


--
-- Name: ix_videos_thumbnail; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_thumbnail ON public.videos USING btree (thumbnail);


--
-- Name: ix_videos_videoname; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_videoname ON public.videos USING btree (videoname);


--
-- Name: ix_videos_videopath; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_videos_videopath ON public.videos USING btree (videopath);


--
-- Name: athlete_weight athlete_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.athlete_weight
    ADD CONSTRAINT athlete_id FOREIGN KEY (id) REFERENCES public.users(id) NOT VALID;


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
-- Name: exercise exercise_common_mistake_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_common_mistake_id_fkey FOREIGN KEY (common_mistake_id) REFERENCES public.common_mistake(id) NOT VALID;


--
-- Name: exercise_progress exercise_progress_athlete_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_progress
    ADD CONSTRAINT exercise_progress_athlete_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id);


--
-- Name: reps_progress reps_progress_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reps_progress
    ADD CONSTRAINT reps_progress_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id);


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
-- Name: videos videos_personal_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_personal_trainer_id_fkey FOREIGN KEY (personal_trainer_id) REFERENCES public.personal_trainers(id);


--
-- Name: workout_exercise workout_exercise_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT workout_exercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(id);


--
-- Name: workout_exercise workout_exercise_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT workout_exercise_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workout(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

