import { DEVTOOLS_CLASSNAMES } from '../constants';
import { isBrowser } from '../utils/env';

export interface StyleCategoryGroup {
  category: string;
  styles: { property: string; value: string }[];
}

export const STYLE_CATEGORIES: { name: string; props: string[] }[] = [
  {
    name: 'Layout & Position',
    props: [
      'display',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'flex',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-items',
      'align-content',
      'gap',
      'grid-template-columns',
      'grid-template-rows',
      'overflow',
      'visibility',
      'opacity',
    ],
  },
  {
    name: 'Sizing & Box Model',
    props: [
      'width',
      'height',
      'min-width',
      'max-width',
      'min-height',
      'max-height',
      'box-sizing',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
    ],
  },
  {
    name: 'Typography & Text',
    props: [
      'font-family',
      'font-size',
      'font-weight',
      'line-height',
      'color',
      'text-align',
      'text-transform',
      'text-decoration',
      'letter-spacing',
      'white-space',
      'word-break',
    ],
  },
  {
    name: 'Background & Border',
    props: [
      'background-color',
      'background-image',
      'border',
      'border-width',
      'border-style',
      'border-color',
      'border-radius',
      'box-shadow',
      'cursor',
      'transform',
      'transition',
    ],
  },
];

export interface BoxModelMetrics {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  borderTop: number;
  borderRight: number;
  borderBottom: number;
  borderLeft: number;
}

export interface ElementAttribute {
  name: string;
  value: string;
}

export interface DomNodeSummary {
  element: HTMLElement;
  tagName: string;
  id: string;
  classList: string[];
  attributes: ElementAttribute[];
  childCount: number;
  hasText: boolean;
  textPreview: string;
}

export class ElementsManager {
  private selectedElement: HTMLElement | null = null;
  private isSelecting = false;
  private pickerOverlay: HTMLElement | null = null;
  private pickerHighlight: HTMLElement | null = null;
  private pickerLabel: HTMLElement | null = null;
  private onSelectCallback: ((el: HTMLElement) => void) | null = null;

  // Event listeners references for cleanup
  private handlePointerMoveBound = this.handlePointerMove.bind(this);
  private handleClickBound = this.handleClick.bind(this);

  constructor() {
    if (isBrowser) {
      this.selectedElement = document.body || document.documentElement;
    }
  }

  public getSelectedElement(): HTMLElement {
    if (!this.selectedElement || !document.body?.contains(this.selectedElement)) {
      this.selectedElement = document.body || document.documentElement;
    }
    return this.selectedElement;
  }

  public setSelectedElement(el: HTMLElement) {
    this.selectedElement = el;
  }

  // --- Element Picker Overlay ---

  public startPicker(onSelect: (el: HTMLElement) => void) {
    if (this.isSelecting) return;
    this.isSelecting = true;
    this.onSelectCallback = onSelect;

    this.createPickerOverlay();

    window.addEventListener('pointermove', this.handlePointerMoveBound, {
      capture: true,
      passive: false,
    });
    window.addEventListener('click', this.handleClickBound, { capture: true, passive: false });
    window.addEventListener('touchstart', this.handlePointerMoveBound, {
      capture: true,
      passive: false,
    });
  }

  public stopPicker() {
    if (!this.isSelecting) return;
    this.isSelecting = false;
    this.onSelectCallback = null;

    window.removeEventListener('pointermove', this.handlePointerMoveBound, { capture: true });
    window.removeEventListener('click', this.handleClickBound, { capture: true });
    window.removeEventListener('touchstart', this.handlePointerMoveBound, { capture: true });

    this.removePickerOverlay();
  }

  public isPickerActive(): boolean {
    return this.isSelecting;
  }

  private createPickerOverlay() {
    if (this.pickerOverlay) return;

    this.pickerOverlay = document.createElement('div');
    this.pickerOverlay.className = DEVTOOLS_CLASSNAMES.PICKER_OVERLAY;
    this.pickerOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 2147483646;
      pointer-events: none;
    `;

    this.pickerHighlight = document.createElement('div');
    this.pickerHighlight.style.cssText = `
      position: fixed;
      border: 2px solid #3b82f6;
      background-color: rgba(59, 130, 246, 0.2);
      pointer-events: none;
      transition: all 0.05s ease-out;
      z-index: 2147483646;
      box-sizing: border-box;
      display: none;
    `;

    this.pickerLabel = document.createElement('div');
    this.pickerLabel.style.cssText = `
      position: absolute;
      top: -24px;
      left: 0;
      background: #1e293b;
      color: #f8fafc;
      font-family: monospace;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `;

    this.pickerHighlight.appendChild(this.pickerLabel);
    this.pickerOverlay.appendChild(this.pickerHighlight);
    document.body.appendChild(this.pickerOverlay);
  }

  private removePickerOverlay() {
    if (this.pickerOverlay && this.pickerOverlay.parentNode) {
      this.pickerOverlay.parentNode.removeChild(this.pickerOverlay);
    }
    this.pickerOverlay = null;
    this.pickerHighlight = null;
    this.pickerLabel = null;
  }

  private handlePointerMove(e: Event) {
    if (!this.isSelecting) return;

    let clientX = 0;
    let clientY = 0;

    if (e instanceof MouseEvent || e instanceof PointerEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (
      typeof TouchEvent !== 'undefined' &&
      e instanceof TouchEvent &&
      e.touches.length > 0
    ) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      return;
    }

    const target = document.elementFromPoint(clientX, clientY) as HTMLElement | null;

    if (!target) return;

    // Ignore DevTools Shadow DOM Container or overlay elements
    if (
      target.closest(`.${DEVTOOLS_CLASSNAMES.CONTAINER}`) ||
      target.closest(`.${DEVTOOLS_CLASSNAMES.PICKER_OVERLAY}`) ||
      target.tagName.toLowerCase() === 'html'
    ) {
      if (this.pickerHighlight) this.pickerHighlight.style.display = 'none';
      return;
    }

    this.updateHighlight(target);
  }

  private updateHighlight(target: HTMLElement) {
    if (!this.pickerHighlight || !this.pickerLabel) return;

    const rect = target.getBoundingClientRect();
    this.pickerHighlight.style.display = 'block';
    this.pickerHighlight.style.top = `${rect.top}px`;
    this.pickerHighlight.style.left = `${rect.left}px`;
    this.pickerHighlight.style.width = `${rect.width}px`;
    this.pickerHighlight.style.height = `${rect.height}px`;

    const tag = target.tagName.toLowerCase();
    const id = target.id ? `#${target.id}` : '';
    const classes = Array.from(target.classList)
      .map((c) => `.${c}`)
      .join('');
    const dims = `${Math.round(rect.width)}×${Math.round(rect.height)}`;

    this.pickerLabel.textContent = `${tag}${id}${classes} (${dims})`;

    // Position label inside viewport if near top
    if (rect.top < 28) {
      this.pickerLabel.style.top = '2px';
    } else {
      this.pickerLabel.style.top = '-24px';
    }
  }

  private handleClick(e: MouseEvent) {
    if (!this.isSelecting) return;

    e.preventDefault();
    e.stopPropagation();

    const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;

    if (
      target &&
      !target.closest(`.${DEVTOOLS_CLASSNAMES.CONTAINER}`) &&
      !target.closest(`.${DEVTOOLS_CLASSNAMES.PICKER_OVERLAY}`)
    ) {
      this.setSelectedElement(target);
      const cb = this.onSelectCallback;
      this.stopPicker();
      if (cb) cb(target);
    } else {
      this.stopPicker();
    }
  }

  // --- Inspection Helpers ---

  public getDomNodeSummary(el: HTMLElement): DomNodeSummary {
    const classList = Array.from(el.classList);
    const attributes: ElementAttribute[] = Array.from(el.attributes).map((attr) => ({
      name: attr.name,
      value: attr.value,
    }));

    let childCount = 0;
    let hasText = false;
    let textPreview = '';

    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        childCount++;
      } else if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent?.trim() || '';
        if (txt.length > 0) {
          hasText = true;
          if (!textPreview) {
            textPreview = txt.length > 30 ? txt.slice(0, 30) + '...' : txt;
          }
        }
      }
    });

    return {
      element: el,
      tagName: el.tagName.toLowerCase(),
      id: el.id,
      classList,
      attributes,
      childCount,
      hasText,
      textPreview,
    };
  }

  public getElementAncestors(el: HTMLElement): HTMLElement[] {
    const ancestors: HTMLElement[] = [];
    let curr: HTMLElement | null = el;
    while (curr && curr !== document.documentElement) {
      ancestors.unshift(curr);
      curr = curr.parentElement;
    }
    if (document.documentElement) {
      ancestors.unshift(document.documentElement);
    }
    return ancestors;
  }

  public getBoxModel(el: HTMLElement): BoxModelMetrics {
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();

    const parsePx = (val: string) => parseFloat(val) || 0;

    return {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      marginTop: parsePx(style.marginTop),
      marginRight: parsePx(style.marginRight),
      marginBottom: parsePx(style.marginBottom),
      marginLeft: parsePx(style.marginLeft),
      paddingTop: parsePx(style.paddingTop),
      paddingRight: parsePx(style.paddingRight),
      paddingBottom: parsePx(style.paddingBottom),
      paddingLeft: parsePx(style.paddingLeft),
      borderTop: parsePx(style.borderTopWidth),
      borderRight: parsePx(style.borderRightWidth),
      borderBottom: parsePx(style.borderBottomWidth),
      borderLeft: parsePx(style.borderLeftWidth),
    };
  }

  public getComputedStyles(el: HTMLElement, filter = ''): { property: string; value: string }[] {
    const styles = window.getComputedStyle(el);
    const result: { property: string; value: string }[] = [];

    const keyProps = [
      'display',
      'position',
      'flex-direction',
      'justify-content',
      'align-items',
      'width',
      'height',
      'margin',
      'padding',
      'color',
      'background-color',
      'font-family',
      'font-size',
      'font-weight',
      'border',
      'box-shadow',
      'opacity',
      'z-index',
      'overflow',
    ];

    const filterLower = filter.toLowerCase();

    for (let i = 0; i < styles.length; i++) {
      const prop = styles[i];
      const val = styles.getPropertyValue(prop);
      if (!val) continue;

      if (filterLower) {
        if (prop.toLowerCase().includes(filterLower) || val.toLowerCase().includes(filterLower)) {
          result.push({ property: prop, value: val });
        }
      } else {
        result.push({ property: prop, value: val });
      }
    }

    if (!filterLower) {
      result.sort((a, b) => {
        const aIndex = keyProps.indexOf(a.property);
        const bIndex = keyProps.indexOf(b.property);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.property.localeCompare(b.property);
      });
    }

    return result;
  }

  public getGroupedComputedStyles(el: HTMLElement, filter = ''): StyleCategoryGroup[] {
    const allStyles = this.getComputedStyles(el, filter);
    const groups: Map<string, { property: string; value: string }[]> = new Map();

    STYLE_CATEGORIES.forEach((cat) => {
      groups.set(cat.name, []);
    });
    groups.set('Other Properties', []);

    allStyles.forEach((item) => {
      let matchedCategory = 'Other Properties';
      for (const cat of STYLE_CATEGORIES) {
        if (cat.props.includes(item.property)) {
          matchedCategory = cat.name;
          break;
        }
      }
      groups.get(matchedCategory)?.push(item);
    });

    const result: StyleCategoryGroup[] = [];
    groups.forEach((styles, category) => {
      if (styles.length > 0) {
        result.push({ category, styles });
      }
    });

    return result;
  }
}
