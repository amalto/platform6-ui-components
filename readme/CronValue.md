```typescript
export interface CronValue {
    
    /** Either the input group is enabled or not. */
    enabled?: boolean;

    /** Second with format /[^0-9\,\-\*\/]/ */
    second?: string;

    /** Minute with format /[^0-9\,\-\*\/]/ */    
    minute?: string;
    
    /** Hour with format /[^0-9\,\-\*\/]/ */
    hour?: string;
    
    /** Day of month with format /[^0-9WL\,\-\*\/\?]/ */
    dayOfMonth?: string;
    
    /** Month with format /[^0-9\,\-\*\/JANFEBMRPRYJUNLGOCTVD]/ */
    month?: string;
    
    /** Day of week with format /[^1-7\,\-\*\/\?#SUNMOTEWDHFRIAL]/ */
    dayOfWeek?: string;
    
    /** Year with format /[^\,\-\*\/0-9]/ */
    year?: string;
}
```