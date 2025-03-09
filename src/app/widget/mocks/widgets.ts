import { of } from 'rxjs';

export const widgets = of([
  {
    widgetKey: 'regular-widget',
    inputs: {
      title: 'Weather',
      description: 'Current weather in your area',
    },
    content: [],
  },
  {
    widgetKey: 'regular-widget',
    inputs: {
      title: 'Velocity',
      description: 'Team Performance',
    },
    content: [],
  },
]);
