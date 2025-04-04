import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterContainer from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<Toaster
				position="top-right"
				gutter={12}
				containerStyle={{
					top: "1.5rem",
					right: "1.5rem",
				}}
				toastOptions={{
					duration: 5000,
					style: {
						padding: 0,
						background: "transparent",
						boxShadow: "none",
					},
				}}
			/>
			<RouterContainer />
		</Provider>
	</StrictMode>
);
