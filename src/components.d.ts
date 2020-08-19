/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BisuSideDrawer {
        "open": () => Promise<void>;
        "opened": boolean;
        "title": string;
    }
    interface BisuSpinner {
    }
    interface BisuStockFinder {
    }
    interface BisuStockPrice {
        "stockSymbol": string;
    }
}
declare global {
    interface HTMLBisuSideDrawerElement extends Components.BisuSideDrawer, HTMLStencilElement {
    }
    var HTMLBisuSideDrawerElement: {
        prototype: HTMLBisuSideDrawerElement;
        new (): HTMLBisuSideDrawerElement;
    };
    interface HTMLBisuSpinnerElement extends Components.BisuSpinner, HTMLStencilElement {
    }
    var HTMLBisuSpinnerElement: {
        prototype: HTMLBisuSpinnerElement;
        new (): HTMLBisuSpinnerElement;
    };
    interface HTMLBisuStockFinderElement extends Components.BisuStockFinder, HTMLStencilElement {
    }
    var HTMLBisuStockFinderElement: {
        prototype: HTMLBisuStockFinderElement;
        new (): HTMLBisuStockFinderElement;
    };
    interface HTMLBisuStockPriceElement extends Components.BisuStockPrice, HTMLStencilElement {
    }
    var HTMLBisuStockPriceElement: {
        prototype: HTMLBisuStockPriceElement;
        new (): HTMLBisuStockPriceElement;
    };
    interface HTMLElementTagNameMap {
        "bisu-side-drawer": HTMLBisuSideDrawerElement;
        "bisu-spinner": HTMLBisuSpinnerElement;
        "bisu-stock-finder": HTMLBisuStockFinderElement;
        "bisu-stock-price": HTMLBisuStockPriceElement;
    }
}
declare namespace LocalJSX {
    interface BisuSideDrawer {
        "opened"?: boolean;
        "title"?: string;
    }
    interface BisuSpinner {
    }
    interface BisuStockFinder {
        "onBisuStockSymbolSelected"?: (event: CustomEvent<string>) => void;
    }
    interface BisuStockPrice {
        "stockSymbol"?: string;
    }
    interface IntrinsicElements {
        "bisu-side-drawer": BisuSideDrawer;
        "bisu-spinner": BisuSpinner;
        "bisu-stock-finder": BisuStockFinder;
        "bisu-stock-price": BisuStockPrice;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "bisu-side-drawer": LocalJSX.BisuSideDrawer & JSXBase.HTMLAttributes<HTMLBisuSideDrawerElement>;
            "bisu-spinner": LocalJSX.BisuSpinner & JSXBase.HTMLAttributes<HTMLBisuSpinnerElement>;
            "bisu-stock-finder": LocalJSX.BisuStockFinder & JSXBase.HTMLAttributes<HTMLBisuStockFinderElement>;
            "bisu-stock-price": LocalJSX.BisuStockPrice & JSXBase.HTMLAttributes<HTMLBisuStockPriceElement>;
        }
    }
}
