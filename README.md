# async-modal-react

This is a simple solution to create a modal in React using hooks and async/await.   

## Install

```bash
npm install async-modal-react

yarn add async-modal-react
```

## Usage

### Wrap your Root Component with ModalProvider

```jsx
import { ModalProvider } from "async-modal-react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ModalProvider>
        <App />
    </ModalProvider>,
);
```

