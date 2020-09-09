export interface ValidEventDetail<T> {
  name: string;
  value: T;
}
export interface InvalidEventDetail {
  name: string;
  message: string;
}

export type ValidEvent<T> = CustomEvent<ValidEventDetail<T>>;
export type InvalidEvent = CustomEvent<InvalidEventDetail>;

export function isCustomEvent(data: Event): data is CustomEvent {
  return 'detail' in data;
}

export function isValidEvent<T>(data: Event): data is CustomEvent<ValidEventDetail<T>> {
  return isCustomEvent(data) && 'name' in data.detail && 'value' in data.detail;
}

export function isInvalidEvent(data: Event): data is CustomEvent<InvalidEventDetail> {
  return isCustomEvent(data) && 'name' in data.detail && 'message' in data.detail;
}
