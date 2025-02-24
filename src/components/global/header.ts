import { TViewConstructionArgs, View } from '../base/view';

type THeaderRenderArgs = {
	counter: number;
};

type THeaderEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};

class Header extends View<
	HTMLElement,
	THeaderRenderArgs,
	THeaderEventHandlers
> {
	protected _counterElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;

	constructor(args: TViewConstructionArgs<HTMLElement, THeaderEventHandlers>) {
		super(args);

		this._counterElement = this._element.querySelector(
			'.header__basket-counter'
		);

		this._buttonElement = this._element.querySelector('.header__basket');

		if (this._eventHandlers.onClick instanceof Function) {
			this._buttonElement.addEventListener(
				'click',
				this._handleClick.bind(this)
			);
		}
	}

	protected _handleClick(event: MouseEvent) {
		this._eventHandlers.onClick({
			_event: event,
		});
	}

	set counter(value: number) {
		this._counterElement.textContent = String(value);
	}
}

export { Header as HeaderView, THeaderRenderArgs, THeaderEventHandlers };