import { TViewConstructionArgs, View, TViewNested} from '../base/view';

type TPageRenderArgs = {
	isLocked?: boolean;
	counter?: number;
};

type TProductsRenderArgs<T extends object> = {
	items?: TViewNested<T>[];
};

type TPageEventHandlers = {
	onClick?: (args: { _event: MouseEvent }) => void;
};

class Page extends View<HTMLElement, TPageRenderArgs & TProductsRenderArgs<object>, TPageEventHandlers> {
	protected _wrapperElement: HTMLElement;
	protected _counterElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
	protected _productsContainer: HTMLElement;

	constructor(args: TViewConstructionArgs<HTMLElement, TPageEventHandlers>) {
		super(args);

		this._wrapperElement = this._element.querySelector('.page__wrapper');

		this._counterElement = this._element.querySelector(
			'.header__basket-counter'
		);

		this._buttonElement = this._element.querySelector('.header__basket');

		this._productsContainer = this._element.querySelector('.gallery');

		if (this._eventHandlers.onClick instanceof Function) {
			this._buttonElement.addEventListener(
				'click',
				this._handleClick.bind(this)
			);
		}
	}

	set isLocked(value: boolean) {
		this._wrapperElement.classList.toggle('page__wrapper_locked', value);
	}

	protected _handleClick(event: MouseEvent) {
		this._eventHandlers.onClick({
			_event: event,
		});
	}

	set counter(value: number) {
		this._counterElement.textContent = String(value);
	}

	set items(value: TViewNested[]) {
		this._productsContainer.replaceChildren(
			...value.map(({ view, renderArgs }) =>
				view instanceof View ? view.render(renderArgs) : view
			)
		);
	}

	render<RenderArgs extends object = object>(
		args: TPageRenderArgs & TProductsRenderArgs<RenderArgs>
	) {
		super.render(args);

		if (args.items) {
			this.items = args.items;
		}

		return this._element;
	}
}

export { Page as PageView, TPageRenderArgs, TPageEventHandlers, TProductsRenderArgs };