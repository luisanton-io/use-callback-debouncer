# useCallbackDebouncer

A custom React hook to debounce asynchronous functions and ensure only the latest promise resolves. This debouncer is particularly useful when you have rapid, consecutive calls to an API or a similar asynchronous process and you only want to consider the result of the latest one.

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
import useCallbackDebouncer from "use-callback-debouncer";

function MyComponent() {
  const myAsyncFunction = async () => {
    // your async logic here
  };

  const [debouncedFunction, cancelDebounce] = useCallbackDebouncer(
    myAsyncFunction,
    500
  );

  return <button onClick={debouncedFunction}>Click Me</button>;
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

```

---

Make sure to properly separate out the blocks of code, and ensure that when you use this in a markdown viewer or on platforms like GitHub, it renders correctly.
```
