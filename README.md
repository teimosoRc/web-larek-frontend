# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Концепция приложения

MVP (Model-View-Presenter) — это архитектурный шаблон, который часто используется для разработки пользовательских интерфейсов. Он помогает отделить логику приложения от визуального представления, что делает код более модульным и тестируемым.

Приложение основано на шаблоне проектирования MVP. В данном контексте все приложение содержит общий "Presenter", который координирует работу всех View и Model через событийно-ориентированный подход, используя механизм сообщений, которые возникают в результате определенных событий внутри отображений и моделей

Model (Модель) - часть приложения, которая работает с данными, проводит вычисления и руководит всеми бизнес-процессами.

View (Вид или представление) - часть приложения, показывающая пользователю интерфейс и данные из модели на экране.

Presenter (Представитель) - часть приложения, которая обеспечивает связь, является посредником между моделью и видом.

## Типы данных

Для описания товара используется интерфейс IProduct

```ts
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

Для описания заказа используется интерфейс IOrder

```ts
interface IOrder {
	items: IProduct[];
	payment: TOrderPayment;
	address: string;
	email: string;
	phone: string;
}
```

Для описания способов оплаты заказа используется тип TOrderPayment

```ts
type TOrderPayment = 'cash' | 'card';
```

## Базовые классы

### Класс **API**

Используется для получения и отправки данных с серверным api

В качестве набора HTTP методов использует тип TApiPostMethods

```ts
type TApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

### Класс **EventEmitter**

Обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события

Использует типы TEmitterEvent, TSubscriber, TEventName и интерфейс IEvents

```ts
type TEventName = string | RegExp;

type TSubscriber = Function;

type TEmitterEvent = {
	eventName: string;
	data: unknown;
};

interface IEvents {
	on<T extends object>(event: TEventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}
```

### Класс **View**

Абстрактный класс, который задает конструктор для всех представлений приложения, а также метод для рендеринга (render) связанного с представлением DOM-элемента с определенным набором параметров (args). Кроме того, он включает список событий, связанных с представлением, и брокер событий для обработки внутренних сообщений.

Конструктор принимает в качестве аргумента специальный тип TViewConstructionArgs, содержащий DOM элемент, привязанный к View, брокер и список доступных событий

```ts
type TViewConstructionArgs<
	Element extends HTMLElement = HTMLElement,
	EventHandlers extends object = object
> = {
	element: Element;
	eventEmitter: IEvents;
	eventHandlers?: EventHandlers;
};
```

## Представление

### Класс **Page**

Отображение самой страницы. Отвечает за визуальное представление контента и управление возможностями скроллинга

Наследуется от View. Использует поля типа TPageRenderArgs

```ts
type TPageRenderArgs = {
	isLocked: boolean;
};
```

### Класс **Header**

Представление заголовка страницы. Включает отображение счетчика корзины и предоставляет возможность выполнять определенные действия при нажатии на иконку корзины.

Это представление наследуется от класса View и использует при рендеринге поля типа THeaderRenderArgs.

```ts
type THeaderRenderArgs = {
	counter: number;
};
```

### Класс **Modal**

Отображение модального окна. Предоставляет методы для открытия и закрытия модального окна страницы

Наследуется от View

Методы

- **open** Открыть модальное окно

- **close** Закрыть модальное окно

### Класс **Form**

Отображение формы, ошибок валидации формы, прослушка событий отправки формы, внесения изменений в поля формы

Доступный список событий описан типом TFormEventHandler. Наследуется от View. Использует поля типа TFormRenderArgs

```ts
type TFormEventHandlers = {
	onSubmit: () => void;
	onInput: () => void;
};

type TFormRenderArgs = {
	isDisabled: boolean;
	errors: string[];
};
```

### Класс **Basket**

Представление корзины. Включает список предметов в корзине, общую стоимость позиций и предоставляет возможность производить действия при нажатии на кнопку оформления заказа.

Это представление наследуется от класса View и использует поля типа TBasketRenderArgs при рендеринге. Доступный список событий описан типом TBasketEventHandlers:

```ts
type TBasketRenderArgs = {
	items: [];
	price: string;
};

type TBasketItemEventHandlers = {
	onClick: () => void;
};
```

### Класс **Products**

Представление товара. Включает в себя ключевые характеристики товара и предлагает возможность выполнять определенные действия по клику на него.

Это представление наследуется от класса View и использует поля типа TProductRenderArgs

```ts
type TProductRenderArgs = Pick<IProduct, 'image' | 'title' | 'category'> & {
	price: string;
	color: string | null;
};
```

### Класс **Product**

Детальное отображение товара. Предоставляет полные характеристики товара и включает возможность выполнения действий по клику на кнопку.

Это представление наследуется от класса Product и использует поля типа TProductPreviewRenderArgs при рендеринге

```ts
type TProductPreviewRenderArgs = {
	description: string;
	buttonText: string;
	isDisabled: boolean;
} & TProductRenderArgs;
```

### Класс **OrderShipment**

Отображение формы заказа с полями способ оплаты, адрес доставки.

Наследуется от Form. Использует поля типа TOrderShipmentRenderArgs

```ts
type TOrderShipmentRenderArgs = {
	payment: string;
	address: string;
} & TFormRenderArgs;
```

### Класс **OrderContacts**

Отображение формы заказа с полями email, телефон.

Наследуется от Form. Использует поля типа TOrderContactsRenderArgs

```ts
type TOrderContactsRenderArgs = {
	email: string;
	phone: string;
} & TFormRenderArgs;
```

### Класс **OrderSuccess**

Отображение успешности оформления заказа. Содержит информацию о потраченных ресурсах при успешном оформлении заказа

Наследуется от View. Использует поля типа TOrderSuccessRenderArgs

```ts
type TOrderSuccessRenderArgs = {
	description: string;
};
```

## Модели данных

### Класс **AppState**

Модель данных приложения выполняет роль глобального хранилища данных и предоставляет набор методов для управления процессом работы приложения. Она поддерживает такие функции, как добавление товаров в корзину, детальный просмотр товара, заполнение полей заказа.

В этом контексте модель данных служит распределителем между товарами, корзиной и заказом, обеспечивая их взаимодействие.

Содержит поля интерфейса IAppState

```ts
interface IAppState {
	preview: IProduct;
	basket: Set<IProduct>;
	products: IProduct[];
	order: IOrder;
}
```

Набор методов

```ts
// Установка этапа оформления заказа
setStep() {}

// Установка поля заказа
setOrderField(field: keyof IOrder, value: unknown) {}

// Проверка валидности текущего заказа
getOrderIsValid() {}

// Получение ошибок текущего заказа
getOrderErrors() {}

// Получение полей заказа в виде для взаимодействия с API
getOrderInvoice() {}

// Инициализация нового заказа
initOrder() {}

// Сброс всех полей заказа
resetOrder() {}

// Установка товаров каталога
setProductsItems(value: IProduct[]) {}

// Проверка на наличие товара в корзине
getBasketIsContains(id: string) {}

// Добавление товара в корзину
addBasketItem(value: IProduct) {}

// Удаление товара из корзины
removeBasketItem(id: string) {}

// Сброс текущего состояния корзины
resetBasket() {}

// Инициализация корзины
initBasket() {}

// Получение цены позиций в корзине
getBasketPrice() {}

// Установка текущего просматриваемого элемента
setPreview(value: IProduct) {}
```

Доступные события для использования объектом класса EventEmitter

```ts
enum AppStateEvents {
	// Событие возникающее при изменении списка товаров каталога
	PRODUCTS_UPDATE = 'products:update',
	// Событие возникающее при изменении preview
	PREVIEW_UPDATE = 'preview:update',
	// Событие возникающее при инициализации корзины
	BASKET_INIT = 'basket:init',
	// Событие возникающее при изменении товаров в корзине
	BASKET_UPDATE = 'basket:update',
	// Событие возникающее при сбросе корзины
	BASKET_RESET = 'basket:reset',
	// Событие возникающее при изменении этапа заказа
	ORDER_STEP = 'order:step',
	// Событие возникающее при изменении поля заказа
	ORDER_UPDATE = 'order:update',
	// Событие возникающее при сбросе заказа
	ORDER_RESET = 'order:reset',
}
```

- Событие PRODUCTS_UPDATE возникает при вызове метода setProductsItems и в качестве данных передает объект с полем data, поле data - объект, содержит поле items - текущий список элементов каталога (каждый элемент списка реализует интерфейс IProduct)

- Событие PREVIEW_UPDATE возникает при вызове метода setPreview и в качестве данных передает объект с полем data, поле data - объект, содержит поле item - текущий просматриваемый товар (товар реализует интерфейс IProduct)

- Событие BASKET_INIT возникает при вызове метода initBasket и в качестве данных передает объект с полем data, поле data - объект, содержит поле items - текущий список элементов корзины (каждый элемент списка реализует интерфейс IProduct)

- Событие BASKET_UPDATE возникает при вызове методов addBasketItem и removeBasketItem и в качестве данных передает объект с полем data, поле data - объект, содержит поле items - текущий список элементов корзины (каждый элемент списка реализует интерфейс IProduct)

- Событие BASKET_RESET возникает при вызове метода resetBasket и в качестве данных передает объект с полем data, поле data - объект, содержит поле items - текущий список элементов корзины (каждый элемент списка реализует интерфейс IProduct)

- Событие ORDER_STEP возникает при вызове метода setStep и в качестве данных передает объект с полем data, поле data - объект, содержит поле step - текущий этап оформления заказа

- Событие ORDER_UPDATE возникает при вызове метода setOrderField и в качестве данных передает объект с полем data, поле data - объект, содержит поле field - поле заказа (поле является ключем интерфейса IOrder) и поле value - значение поля заказа

- Событие ORDER_RESET возникает при вызове метода resetOrder, не содержит передаваемых данных
