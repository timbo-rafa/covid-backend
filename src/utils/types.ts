export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Date
    ? Date
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

export type SerializedDto<DtoType> = DatesAsStrings<DtoType>

export type DatesAsStrings<T> = {
  [P in keyof T]: T[P] extends Date
    ? string
    : T[P] extends Date | null
    ? string | null
    : T[P] extends (infer U)[]
    ? DatesAsStrings<U>[]
    : T[P];
};
