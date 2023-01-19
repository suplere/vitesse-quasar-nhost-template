type Maybe<T> = T | null;

export type NotifyResult = {
  numIds?: Maybe<number>;
};

export type Query = {
  notifyUsers?: Maybe<NotifyResult>;
};

export type notifyUsersArgs = {
  userIds?: Maybe<Array<Maybe<string>>>;
  webpush_notify?: Maybe<WebpushNotifySettings>;
};

export type WebpushNotifySettings = {
  contents: WebpushLangString;
  url: string;
  subtitle?: Maybe<WebpushLangString>;
  headings: WebpushLangString;
};

type WebpushLangString = {
  en: string;
  cs?: Maybe<string>;
};
