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

export function isCustomEvent(event: Event): event is CustomEvent {
  return "detail" in event;
}

export function isValidEvent<T>(
  event: Event
): event is CustomEvent<ValidEventDetail<T>> {
  return (
    isCustomEvent(event) && "name" in event.detail && "value" in event.detail
  );
}

export function isInvalidEvent(
  event: Event
): event is CustomEvent<InvalidEventDetail> {
  return (
    isCustomEvent(event) && "name" in event.detail && "message" in event.detail
  );
}
