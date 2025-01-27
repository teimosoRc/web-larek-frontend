interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

interface IOrder {
	items: IProduct[];
	payment: TOrderPayment;
	address: string;
	email: string;
	phone: string;
}

type TOrderPayment = 'cash' | 'card';

type TFormEventHandlers = {
	onSubmit: () => void;
	onInput: () => void;
};

type TBasketRenderArgs = {
	items: [];
	price: string;
};

type TBasketItemEventHandlers = {
	onClick: () => void;
}