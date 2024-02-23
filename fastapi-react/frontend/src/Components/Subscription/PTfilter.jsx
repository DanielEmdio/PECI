export default function PTfilter() {
    return (    
        <div className="navbar bg-base-100 rounded-xl my-10">
        <select className="select select-ghost w-full max-w-xs">
            <option disabled selected>Pick the best JS framework</option>
            <option>Svelte</option>
            <option>Vue</option>
            <option>React</option>
        </select>
        <select className="select select-ghost w-full max-w-xs">
            <option disabled selected>Pick the best JS framework</option>
            <option>Svelte</option>
            <option>Vue</option>
            <option>React</option>
        </select>
        <select className="select select-ghost w-full max-w-xs">
            <option disabled selected>Pick the best JS framework</option>
            <option>Svelte</option>
            <option>Vue</option>
            <option>React</option>
        </select>
    </div>
    )
}

<ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
  <li><a>Item 1</a></li>
  <li>
    <details open>
      <summary>Parent item</summary>
      <ul>
        <li><a>Submenu 1</a></li>
        <li><a>Submenu 2</a></li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li><a>item 1</a></li>
              <li><a>item 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </details>
  </li>
  <li><a>Item 3</a></li>
</ul>