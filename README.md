# async-modal-react

![async-modal-react.png](https://github.com/livemehere/async-modal-react/blob/master/async-modal-react.png?raw=true)

[Documentation - livemehere-dev-packs](https://livemehere.github.io/livemehere-dev-packs/docs/category/async-modal-react)

This is a simple solution to create a modal in React using hooks and async/await.  

> Really simple, only what you have to do is wrap your root component with `ModalProvider` and use `useModal` hook.

## Demo

![demo.gif](https://github.com/livemehere/async-modal-react/blob/master/demo/demo.gif?raw=true)

## Short Description

- You can open modal by using promise function.
- You can open multiple modals at the same time.
- You can close all modals at the same time.
- You can close modal by clicking outside of modal.
- You can customize reject reason and resolve value.
- Typescript support.
- No dependencies except React.

## Install
 
```bash
npm install async-modal-react@3 # react <=18
npm install async-modal-react@latest # react >=19
```

## Usage

### Wrap your Root Component with ModalProvider

- `closeOnOutsideClick` props is for close modal when click outside of modal(default: true).
- `disableBodyScrollWhenOpen` props is for disable body scroll when modal is opened(default: true).
- `closeOnRouteChange` props is for close all modals when route is changed(default: true).
- `errorOnClose` props is for throw error when modal is closed by clicking outside of modal or route change(default: false).

```jsx
import { ModalProvider } from "async-modal-react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ModalProvider
      closeOnOutsideClick={true}
      disableBodyScrollWhenOpen={true}
      closeOnRouteChange={true}
    >
      <App />
    </ModalProvider>,
);
```

### Create Your Modal Component

- Component that used for modal receive 3 props: `close`, `resolve`, `reject`.
- `resolve` function will return value when using `open` function.
- `close` and `reject` function will reject when using `open` function.
- `reject` reason and `resolve` value can customize by yourself.

> ❗`close` estimated as `reject`

```jsx

const ExampleModal = ({ close, resolve, reject }) => {
  return (
    <div>
      <h2>ExampleModal</h2>
      <button onClick={() => resolve(`resolve!`)}>RESOLVE</button>
      <button onClick={() => reject("reject T-T")}>REJECT</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default ExampleModal;
```

### Use Modal with Hooks

- `useModal` hook return `open` and `closeAll` function.

```jsx
import ExampleModal from "./components/ExampleModal";
import { useModal } from "async-modal-react";

function App() {
    const { open, closeAll } = useModal();

    const openModal = async () => {
        try {
            // resolve
            const result = await open(ExampleModal);
            console.log(result);
        } catch (e) {
            // reject, close
            console.log(e);
        }
    };

    return (
        <div>
            <button onClick={openModal}>OPEN</button>
        </div>
    );
}

export default App;
```

## Typescript Support

### Modal Component Props

- import `ModalProps` from `async-modal-react` and extend your props interface.

```ts
export interface ModalProps {
    close: () => void;
    resolve: <Result = any>(v: Result) => void;
    reject: <Reason = any>(reason: Reason) => void;
}
```

```tsx
import { ModalProps } from "async-modal-react";

export interface ExampleProps extends ModalProps {
  name: string;
}

const ExampleModal = ({ close, resolve, reject, name }: ExampleProps) => {
  return (
    <div>
      <h2>ExampleModal</h2>
      <button onClick={() => resolve(`resolve! ${name}`)}>RESOLVE</button>
      <button onClick={() => reject("reject T-T")}>REJECT</button>
      <button onClick={close}>Close</button>
    </div>
  );
};

export default ExampleModal;
```

### Hooks

- resolve type can be set by generic type.
- second generic type is for modal props. (most case is not necessary)
- `open` function return `Promise<ReturnType>`.
- options are higher priority than `ModalProvider` props. You can set individually.

```tsx
 const result = await open<ReturnType, Props>(
    ExampleModal, // Modal Component
    {}, // ExampleModal props
    { // Individual options
        onClickOutsideClose: true,
        disableScroll: true,
        enableInsideScroll: true, // use this when global disableScroll is true but you want to enable scroll in this modal.
        errorOnClose: true,
    },
);
```

## Customizing

### Modal root element

```jsx
 <div
      id="modal-root"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
  {children}
</div>
```

customize `#modal-root` element with global css.

```css
#modal-root {
  background: blue !important;
}
```

### Multiple modals style

By Default modal root element display children with `flex` and `justifyContent: center`, `alignItems: center`. So if there are more than two modal is opened, they will be displayed in just like a flex.   
if you want to stack layout, your modal component should have `position: absolute` style.

```jsx
// ...
return (
    <div
        style={{
            background: "white",
            position: "absolute",
        }}
    >
        <h2>ExampleModal</h2>
        <button onClick={() => resolve(`resolve! ${name}`)}>RESOLVE</button>
        <button onClick={() => reject("reject T-T")}>REJECT</button>
        <button onClick={close}>Close</button>
        <button onClick={openModal}>OPEN</button>
    </div>
);
```

#### If Modal Component not have `position: absolute` look like.

![multi-modal-flex.png](demo%2Fmulti-modal-flex.png)

#### If Modal Component have `position: absolute` look like.

- Two modals are stacked

![multi-modal-absolute.png](demo%2Fmulti-modal-absolute.png)

