# useCallbackDebouncer

##### <div align="right">by [Luis Antonio Canettoli Ordoñez](http://luisanton.io)</div>

A custom React hook designed to debounce asynchronous functions, ensuring only the latest promise resolves.

It's particularly beneficial when faced with rapid, consecutive calls: for example, repeated API requests triggered by user interactions with text fields, with each keystroke initiating an HTTP request.

Rather than sending a flurry of requests, this debouncer will ensure that only the most recent one proceeds, preventing unnecessary network traffic and potential confusion from out-of-order responses.

Moreover, the hook provides a cancelDebounce function (returned as the second value). This can be handy in situations where you may want to halt any pending debounce actions: for example, if a user were to clear their query from a search field, you could use `cancelDebounce` to stop any upcoming requests, ensuring that no outdated or irrelevant data is fetched.

## Installation

Install the package using npm:

```bash
npm install use-callback-debouncer --save
```

Or with yarn:

```bash
yarn add use-callback-debouncer
```

## Usage

Import and use the hook in your component:

```jsx
import React, { useState, useEffect } from "react";
import useCallbackDebouncer from "use-callback-debouncer";

// An example of some kind of async function you might want to debounce.
async function fetchServer(q: string) {
  const response = await fetch("https://api.xyz/search?q=" + q);
  return await response.json();
}

function MyComponent() {
  // State to hold the user's query and the search results.
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Using the useCallbackDebouncer hook to create a debounced version of the fetchServer function: the function will be delayed by 500ms to avoid rapid, consecutive calls.
  const [debouncedSearch, cancelDebounce] = useCallbackDebouncer(
    fetchServer,
    500
  );

  // Running whenever the user's query changes.
  useEffect(() => {
    if (query) {
      // If there's a query, run the debounced search function and update the results
      debouncedSearch(query).then(setResults);
    } else {
      // If the user clears the search field, cancel any debounced function waiting to run and clear results
      cancelDebounce();
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {!!results.length &&
          results.map((result, index) => <li key={index}>{result}</li>)}
      </ul>
    </div>
  );
}
```

## API

### useCallbackDebouncer(callback, timeout)

**Parameters:**

- `callback` (Function): The async function you wish to debounce.
- `timeout` (Number, optional): The debounce delay in milliseconds. Default is 250ms.

**Returns:**

- `debouncedCallback` (Function): The debounced version of your callback.
- `cancelDebounce` (Function): A function to cancel the current debounce if needed.

## Cleaning up

The hook automatically clears any active timeouts when the component using the hook unmounts. This prevents potential issues with trying to update state on an unmounted component.

## License

[MIT License](./LICENSE)
