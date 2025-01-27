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

Класс, определяющий конструктор всех отображений приложения

## Отображения

### Класс **Page**

Отображение самой страницы

### Класс **Header**

Отображение хедера страницы. Содержит отображение счетчика корзины, а также предоставляет возможность по клику на иконку корзины совершать определенные действия

### Класс **Modal**

Отображение модального окна. Предоставляет методы для открытия и закрытия модального окна страницы

Методы

- **open** Открыть модальное окно

- **close** Закрыть модальное окно

### Класс **Form**

Отображение формы, ошибок валидации формы, прослушка событий отправки формы, внесения изменений в поля формы

Доступный список событий описан типом TFormEventHandler

```ts
type TFormEventHandlers = {
	onSubmit: () => void;
	onInput: () => void;
};
```

### Класс **Basket**

Отображение корзины. Содержит набор позиций корзины, общую сумму позиций, а также предоставляет возможность совершения действий по клику на кнопку оформления

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

Отображение списка товаров

### Класс **Product**

Отображение единицы товара.
