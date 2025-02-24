export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrder {
	items: IProduct[];
	payment: TOrderPayment;
	address: string;
	email: string;
	phone: string;
}

export type TOrderPayment = 'cash' | 'card';

export type TOrderStep = 'shipment' | 'contacts';

export type TOrderInvoice = Omit<IOrder, 'items'> & {
	items: string[];
	total: number;
};

export interface IOrderResult {
	id: string;
	total: number;
}