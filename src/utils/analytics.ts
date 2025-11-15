export const trackEvent = (name: string, props?: Record<string, unknown>) => {
  // TODO: integrate with Go backend analytics pipeline
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Analytics event: ${name}`, props ?? {});
  }
};
