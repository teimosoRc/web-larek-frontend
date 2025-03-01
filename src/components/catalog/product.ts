import { TViewConstructionArgs, View } from '../base/view';

type TProductRenderArgs = {
  index?: number;
  title: string;
  price: string;
  category?: string;
  image?: string;
  color?: string | null;
};

type TProductEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};

class Product<
		Element extends HTMLElement = HTMLElement,
		RenderArgs extends object = TProductRenderArgs,
		EventHandlers extends object = TProductEventHandlers
	> extends View<
		Element, 
		RenderArgs & TProductRenderArgs, 
		EventHandlers & TProductEventHandlers
	> {
		protected _titleElement: HTMLElement;
		protected _categoryElement: HTMLElement | null;
		protected _priceElement: HTMLElement;
		protected _imageElement: HTMLImageElement | null;
		protected _indexElement: HTMLElement | null;
		protected _buttonElement: HTMLButtonElement | null;
	
		constructor(args: TViewConstructionArgs<Element, EventHandlers>) {
			super(args);
	
			this._titleElement = this._element.querySelector('.card__title');
			this._categoryElement = this._element.querySelector('.card__category');
			this._priceElement = this._element.querySelector('.card__price');
			this._imageElement = this._element.querySelector('.card__image');
			this._indexElement = this._element.querySelector('.basket__item-index');
			this._buttonElement = this._element.querySelector('.card__button');
			
	
			if (this._eventHandlers.onClick instanceof Function ) {
				this._element.addEventListener('click', this._handleClick.bind(this));
			}
		}
		
	
		set index(value: number) {
			if (this._indexElement) this._indexElement.textContent = String(value);
		}
	
		set price(value: string) {
			this._priceElement.textContent = String(value);
		}
	
		set title(value: string) {
			this._titleElement.textContent = String(value);
		}
	
		set category(value: string) {
			if (this._categoryElement) {
				this._categoryElement.textContent = String(value);
			}
		}
	
		set image(value: string) {
			if (this._imageElement) this._imageElement.src = String(value);
		}
	
		set color(value: string | null) {
			if (this._categoryElement && value) {
				this._categoryElement.classList.add(`card__category_${value}`);
			}
		}
	
		protected _handleClick(event: MouseEvent) {
			this._eventHandlers.onClick({
				_event: event,
			});
		}
}

export { Product as ProductView, TProductRenderArgs, TProductEventHandlers };