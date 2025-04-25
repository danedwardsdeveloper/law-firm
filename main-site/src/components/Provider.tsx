"use client";
import dynamic from "next/dynamic";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface ProviderContextType {
	contactFormVisible: boolean;
	setContactFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const ProviderContext = createContext<ProviderContextType>({
	contactFormVisible: false,
	setContactFormVisible: () => {},
});

interface ProviderProps {
	children: ReactNode;
}

function ProviderComponent({ children }: ProviderProps) {
	const [contactFormVisible, setContactFormVisible] = useState<boolean>(false);

	return (
		<ProviderContext.Provider
			value={{
				contactFormVisible,
				setContactFormVisible,
			}}
		>
			{children}
		</ProviderContext.Provider>
	);
}

export function useProvider() {
	const context = useContext(ProviderContext);

	if (context === undefined) {
		throw new Error("useProvider must be used within a Provider");
	}

	return context;
}

const Provider = dynamic(() => Promise.resolve(ProviderComponent), {
	ssr: false,
});

export default Provider;
