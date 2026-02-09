import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProductModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductPayload>;
export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
export type ProductAvgAggregateOutputType = {
    price: runtime.Decimal | null;
    compareAtPrice: runtime.Decimal | null;
};
export type ProductSumAggregateOutputType = {
    price: runtime.Decimal | null;
    compareAtPrice: runtime.Decimal | null;
};
export type ProductMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    compareAtPrice: runtime.Decimal | null;
    inStock: boolean | null;
    isFeatured: boolean | null;
    thumbnail: string | null;
    subcategoryId: string | null;
    createdAt: Date | null;
};
export type ProductMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    description: string | null;
    price: runtime.Decimal | null;
    compareAtPrice: runtime.Decimal | null;
    inStock: boolean | null;
    isFeatured: boolean | null;
    thumbnail: string | null;
    subcategoryId: string | null;
    createdAt: Date | null;
};
export type ProductCountAggregateOutputType = {
    id: number;
    slug: number;
    name: number;
    description: number;
    price: number;
    compareAtPrice: number;
    inStock: number;
    isFeatured: number;
    thumbnail: number;
    images: number;
    subcategoryId: number;
    filterValues: number;
    specifications: number;
    createdAt: number;
    _all: number;
};
export type ProductAvgAggregateInputType = {
    price?: true;
    compareAtPrice?: true;
};
export type ProductSumAggregateInputType = {
    price?: true;
    compareAtPrice?: true;
};
export type ProductMinAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    description?: true;
    price?: true;
    compareAtPrice?: true;
    inStock?: true;
    isFeatured?: true;
    thumbnail?: true;
    subcategoryId?: true;
    createdAt?: true;
};
export type ProductMaxAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    description?: true;
    price?: true;
    compareAtPrice?: true;
    inStock?: true;
    isFeatured?: true;
    thumbnail?: true;
    subcategoryId?: true;
    createdAt?: true;
};
export type ProductCountAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    description?: true;
    price?: true;
    compareAtPrice?: true;
    inStock?: true;
    isFeatured?: true;
    thumbnail?: true;
    images?: true;
    subcategoryId?: true;
    filterValues?: true;
    specifications?: true;
    createdAt?: true;
    _all?: true;
};
export type ProductAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProductCountAggregateInputType;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProduct[P]> : Prisma.GetScalarType<T[P], AggregateProduct[P]>;
};
export type ProductGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithAggregationInput | Prisma.ProductOrderByWithAggregationInput[];
    by: Prisma.ProductScalarFieldEnum[] | Prisma.ProductScalarFieldEnum;
    having?: Prisma.ProductScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductCountAggregateInputType | true;
    _avg?: ProductAvgAggregateInputType;
    _sum?: ProductSumAggregateInputType;
    _min?: ProductMinAggregateInputType;
    _max?: ProductMaxAggregateInputType;
};
export type ProductGroupByOutputType = {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    price: runtime.Decimal;
    compareAtPrice: runtime.Decimal | null;
    inStock: boolean;
    isFeatured: boolean;
    thumbnail: string;
    images: string[];
    subcategoryId: string;
    filterValues: runtime.JsonValue;
    specifications: runtime.JsonValue;
    createdAt: Date;
    _count: ProductCountAggregateOutputType | null;
    _avg: ProductAvgAggregateOutputType | null;
    _sum: ProductSumAggregateOutputType | null;
    _min: ProductMinAggregateOutputType | null;
    _max: ProductMaxAggregateOutputType | null;
};
type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductGroupByOutputType[P]>;
}>>;
export type ProductWhereInput = {
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    id?: Prisma.StringFilter<"Product"> | string;
    slug?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFilter<"Product"> | boolean;
    isFeatured?: Prisma.BoolFilter<"Product"> | boolean;
    thumbnail?: Prisma.StringFilter<"Product"> | string;
    images?: Prisma.StringNullableListFilter<"Product">;
    subcategoryId?: Prisma.StringFilter<"Product"> | string;
    filterValues?: Prisma.JsonFilter<"Product">;
    specifications?: Prisma.JsonFilter<"Product">;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    subcategory?: Prisma.XOR<Prisma.SubcategoryScalarRelationFilter, Prisma.SubcategoryWhereInput>;
    variants?: Prisma.ProductVariantListRelationFilter;
};
export type ProductOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    inStock?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    images?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    filterValues?: Prisma.SortOrder;
    specifications?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    subcategory?: Prisma.SubcategoryOrderByWithRelationInput;
    variants?: Prisma.ProductVariantOrderByRelationAggregateInput;
};
export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    OR?: Prisma.ProductWhereInput[];
    NOT?: Prisma.ProductWhereInput | Prisma.ProductWhereInput[];
    name?: Prisma.StringFilter<"Product"> | string;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFilter<"Product"> | boolean;
    isFeatured?: Prisma.BoolFilter<"Product"> | boolean;
    thumbnail?: Prisma.StringFilter<"Product"> | string;
    images?: Prisma.StringNullableListFilter<"Product">;
    subcategoryId?: Prisma.StringFilter<"Product"> | string;
    filterValues?: Prisma.JsonFilter<"Product">;
    specifications?: Prisma.JsonFilter<"Product">;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
    subcategory?: Prisma.XOR<Prisma.SubcategoryScalarRelationFilter, Prisma.SubcategoryWhereInput>;
    variants?: Prisma.ProductVariantListRelationFilter;
}, "id" | "slug">;
export type ProductOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrderInput | Prisma.SortOrder;
    inStock?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    images?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    filterValues?: Prisma.SortOrder;
    specifications?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProductCountOrderByAggregateInput;
    _avg?: Prisma.ProductAvgOrderByAggregateInput;
    _max?: Prisma.ProductMaxOrderByAggregateInput;
    _min?: Prisma.ProductMinOrderByAggregateInput;
    _sum?: Prisma.ProductSumOrderByAggregateInput;
};
export type ProductScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductScalarWhereWithAggregatesInput | Prisma.ProductScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Product"> | string | null;
    price?: Prisma.DecimalWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.DecimalNullableWithAggregatesFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolWithAggregatesFilter<"Product"> | boolean;
    isFeatured?: Prisma.BoolWithAggregatesFilter<"Product"> | boolean;
    thumbnail?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    images?: Prisma.StringNullableListFilter<"Product">;
    subcategoryId?: Prisma.StringWithAggregatesFilter<"Product"> | string;
    filterValues?: Prisma.JsonWithAggregatesFilter<"Product">;
    specifications?: Prisma.JsonWithAggregatesFilter<"Product">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Product"> | Date | string;
};
export type ProductCreateInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    subcategory: Prisma.SubcategoryCreateNestedOneWithoutProductsInput;
    variants?: Prisma.ProductVariantCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    subcategoryId: string;
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    variants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subcategory?: Prisma.SubcategoryUpdateOneRequiredWithoutProductsNestedInput;
    variants?: Prisma.ProductVariantUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: Prisma.ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductCreateManyInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    subcategoryId: string;
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProductUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type ProductCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrder;
    inStock?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    images?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    filterValues?: Prisma.SortOrder;
    specifications?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrder;
};
export type ProductMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrder;
    inStock?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrder;
    inStock?: Prisma.SortOrder;
    isFeatured?: Prisma.SortOrder;
    thumbnail?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProductSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
    compareAtPrice?: Prisma.SortOrder;
};
export type ProductScalarRelationFilter = {
    is?: Prisma.ProductWhereInput;
    isNot?: Prisma.ProductWhereInput;
};
export type ProductListRelationFilter = {
    every?: Prisma.ProductWhereInput;
    some?: Prisma.ProductWhereInput;
    none?: Prisma.ProductWhereInput;
};
export type ProductOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductCreateimagesInput = {
    set: string[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ProductUpdateimagesInput = {
    set?: string[];
    push?: string | string[];
};
export type ProductCreateNestedOneWithoutVariantsInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutVariantsInput, Prisma.ProductUncheckedCreateWithoutVariantsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutVariantsInput;
    connect?: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutVariantsInput, Prisma.ProductUncheckedCreateWithoutVariantsInput>;
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutVariantsInput;
    upsert?: Prisma.ProductUpsertWithoutVariantsInput;
    connect?: Prisma.ProductWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProductUpdateToOneWithWhereWithoutVariantsInput, Prisma.ProductUpdateWithoutVariantsInput>, Prisma.ProductUncheckedUpdateWithoutVariantsInput>;
};
export type ProductCreateNestedManyWithoutSubcategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput> | Prisma.ProductCreateWithoutSubcategoryInput[] | Prisma.ProductUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSubcategoryInput | Prisma.ProductCreateOrConnectWithoutSubcategoryInput[];
    createMany?: Prisma.ProductCreateManySubcategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput> | Prisma.ProductCreateWithoutSubcategoryInput[] | Prisma.ProductUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSubcategoryInput | Prisma.ProductCreateOrConnectWithoutSubcategoryInput[];
    createMany?: Prisma.ProductCreateManySubcategoryInputEnvelope;
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
};
export type ProductUpdateManyWithoutSubcategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput> | Prisma.ProductCreateWithoutSubcategoryInput[] | Prisma.ProductUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSubcategoryInput | Prisma.ProductCreateOrConnectWithoutSubcategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutSubcategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutSubcategoryInput[];
    createMany?: Prisma.ProductCreateManySubcategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutSubcategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutSubcategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutSubcategoryInput | Prisma.ProductUpdateManyWithWhereWithoutSubcategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput> | Prisma.ProductCreateWithoutSubcategoryInput[] | Prisma.ProductUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.ProductCreateOrConnectWithoutSubcategoryInput | Prisma.ProductCreateOrConnectWithoutSubcategoryInput[];
    upsert?: Prisma.ProductUpsertWithWhereUniqueWithoutSubcategoryInput | Prisma.ProductUpsertWithWhereUniqueWithoutSubcategoryInput[];
    createMany?: Prisma.ProductCreateManySubcategoryInputEnvelope;
    set?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    disconnect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    delete?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    connect?: Prisma.ProductWhereUniqueInput | Prisma.ProductWhereUniqueInput[];
    update?: Prisma.ProductUpdateWithWhereUniqueWithoutSubcategoryInput | Prisma.ProductUpdateWithWhereUniqueWithoutSubcategoryInput[];
    updateMany?: Prisma.ProductUpdateManyWithWhereWithoutSubcategoryInput | Prisma.ProductUpdateManyWithWhereWithoutSubcategoryInput[];
    deleteMany?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
};
export type ProductCreateWithoutVariantsInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    subcategory: Prisma.SubcategoryCreateNestedOneWithoutProductsInput;
};
export type ProductUncheckedCreateWithoutVariantsInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    subcategoryId: string;
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProductCreateOrConnectWithoutVariantsInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutVariantsInput, Prisma.ProductUncheckedCreateWithoutVariantsInput>;
};
export type ProductUpsertWithoutVariantsInput = {
    update: Prisma.XOR<Prisma.ProductUpdateWithoutVariantsInput, Prisma.ProductUncheckedUpdateWithoutVariantsInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutVariantsInput, Prisma.ProductUncheckedCreateWithoutVariantsInput>;
    where?: Prisma.ProductWhereInput;
};
export type ProductUpdateToOneWithWhereWithoutVariantsInput = {
    where?: Prisma.ProductWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutVariantsInput, Prisma.ProductUncheckedUpdateWithoutVariantsInput>;
};
export type ProductUpdateWithoutVariantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subcategory?: Prisma.SubcategoryUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductUncheckedUpdateWithoutVariantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCreateWithoutSubcategoryInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    variants?: Prisma.ProductVariantCreateNestedManyWithoutProductInput;
};
export type ProductUncheckedCreateWithoutSubcategoryInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    variants?: Prisma.ProductVariantUncheckedCreateNestedManyWithoutProductInput;
};
export type ProductCreateOrConnectWithoutSubcategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput>;
};
export type ProductCreateManySubcategoryInputEnvelope = {
    data: Prisma.ProductCreateManySubcategoryInput | Prisma.ProductCreateManySubcategoryInput[];
    skipDuplicates?: boolean;
};
export type ProductUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductUpdateWithoutSubcategoryInput, Prisma.ProductUncheckedUpdateWithoutSubcategoryInput>;
    create: Prisma.XOR<Prisma.ProductCreateWithoutSubcategoryInput, Prisma.ProductUncheckedCreateWithoutSubcategoryInput>;
};
export type ProductUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductUpdateWithoutSubcategoryInput, Prisma.ProductUncheckedUpdateWithoutSubcategoryInput>;
};
export type ProductUpdateManyWithWhereWithoutSubcategoryInput = {
    where: Prisma.ProductScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyWithoutSubcategoryInput>;
};
export type ProductScalarWhereInput = {
    AND?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    OR?: Prisma.ProductScalarWhereInput[];
    NOT?: Prisma.ProductScalarWhereInput | Prisma.ProductScalarWhereInput[];
    id?: Prisma.StringFilter<"Product"> | string;
    slug?: Prisma.StringFilter<"Product"> | string;
    name?: Prisma.StringFilter<"Product"> | string;
    description?: Prisma.StringNullableFilter<"Product"> | string | null;
    price?: Prisma.DecimalFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.DecimalNullableFilter<"Product"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFilter<"Product"> | boolean;
    isFeatured?: Prisma.BoolFilter<"Product"> | boolean;
    thumbnail?: Prisma.StringFilter<"Product"> | string;
    images?: Prisma.StringNullableListFilter<"Product">;
    subcategoryId?: Prisma.StringFilter<"Product"> | string;
    filterValues?: Prisma.JsonFilter<"Product">;
    specifications?: Prisma.JsonFilter<"Product">;
    createdAt?: Prisma.DateTimeFilter<"Product"> | Date | string;
};
export type ProductCreateManySubcategoryInput = {
    id?: string;
    slug: string;
    name: string;
    description?: string | null;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail: string;
    images?: Prisma.ProductCreateimagesInput | string[];
    filterValues: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type ProductUpdateWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: Prisma.ProductVariantUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    variants?: Prisma.ProductVariantUncheckedUpdateManyWithoutProductNestedInput;
};
export type ProductUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    compareAtPrice?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    inStock?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isFeatured?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    thumbnail?: Prisma.StringFieldUpdateOperationsInput | string;
    images?: Prisma.ProductUpdateimagesInput | string[];
    filterValues?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    specifications?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProductCountOutputType = {
    variants: number;
};
export type ProductCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    variants?: boolean | ProductCountOutputTypeCountVariantsArgs;
};
export type ProductCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductCountOutputTypeSelect<ExtArgs> | null;
};
export type ProductCountOutputTypeCountVariantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductVariantWhereInput;
};
export type ProductSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    compareAtPrice?: boolean;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail?: boolean;
    images?: boolean;
    subcategoryId?: boolean;
    filterValues?: boolean;
    specifications?: boolean;
    createdAt?: boolean;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
    variants?: boolean | Prisma.Product$variantsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    compareAtPrice?: boolean;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail?: boolean;
    images?: boolean;
    subcategoryId?: boolean;
    filterValues?: boolean;
    specifications?: boolean;
    createdAt?: boolean;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    compareAtPrice?: boolean;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail?: boolean;
    images?: boolean;
    subcategoryId?: boolean;
    filterValues?: boolean;
    specifications?: boolean;
    createdAt?: boolean;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["product"]>;
export type ProductSelectScalar = {
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    description?: boolean;
    price?: boolean;
    compareAtPrice?: boolean;
    inStock?: boolean;
    isFeatured?: boolean;
    thumbnail?: boolean;
    images?: boolean;
    subcategoryId?: boolean;
    filterValues?: boolean;
    specifications?: boolean;
    createdAt?: boolean;
};
export type ProductOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "name" | "description" | "price" | "compareAtPrice" | "inStock" | "isFeatured" | "thumbnail" | "images" | "subcategoryId" | "filterValues" | "specifications" | "createdAt", ExtArgs["result"]["product"]>;
export type ProductInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
    variants?: boolean | Prisma.Product$variantsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProductCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProductIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
};
export type ProductIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
};
export type $ProductPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Product";
    objects: {
        subcategory: Prisma.$SubcategoryPayload<ExtArgs>;
        variants: Prisma.$ProductVariantPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        name: string;
        description: string | null;
        price: runtime.Decimal;
        compareAtPrice: runtime.Decimal | null;
        inStock: boolean;
        isFeatured: boolean;
        thumbnail: string;
        images: string[];
        subcategoryId: string;
        filterValues: runtime.JsonValue;
        specifications: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["product"]>;
    composites: {};
};
export type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductPayload, S>;
export type ProductCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductCountAggregateInputType | true;
};
export interface ProductDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Product'];
        meta: {
            name: 'Product';
        };
    };
    findUnique<T extends ProductFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProductFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProductFindManyArgs>(args?: Prisma.SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProductCreateArgs>(args: Prisma.SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProductCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProductDeleteArgs>(args: Prisma.SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProductUpdateArgs>(args: Prisma.SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProductDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProductUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProductUpsertArgs>(args: Prisma.SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProductCountArgs>(args?: Prisma.Subset<T, ProductCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductCountAggregateOutputType> : number>;
    aggregate<T extends ProductAggregateArgs>(args: Prisma.Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>;
    groupBy<T extends ProductGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProductFieldRefs;
}
export interface Prisma__ProductClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subcategory<T extends Prisma.SubcategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubcategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    variants<T extends Prisma.Product$variantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Product$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProductFieldRefs {
    readonly id: Prisma.FieldRef<"Product", 'String'>;
    readonly slug: Prisma.FieldRef<"Product", 'String'>;
    readonly name: Prisma.FieldRef<"Product", 'String'>;
    readonly description: Prisma.FieldRef<"Product", 'String'>;
    readonly price: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly compareAtPrice: Prisma.FieldRef<"Product", 'Decimal'>;
    readonly inStock: Prisma.FieldRef<"Product", 'Boolean'>;
    readonly isFeatured: Prisma.FieldRef<"Product", 'Boolean'>;
    readonly thumbnail: Prisma.FieldRef<"Product", 'String'>;
    readonly images: Prisma.FieldRef<"Product", 'String[]'>;
    readonly subcategoryId: Prisma.FieldRef<"Product", 'String'>;
    readonly filterValues: Prisma.FieldRef<"Product", 'Json'>;
    readonly specifications: Prisma.FieldRef<"Product", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Product", 'DateTime'>;
}
export type ProductFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
export type ProductCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
};
export type ProductCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProductCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProductIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProductUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type ProductUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProductUpdateManyMutationInput, Prisma.ProductUncheckedUpdateManyInput>;
    where?: Prisma.ProductWhereInput;
    limit?: number;
    include?: Prisma.ProductIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProductUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProductUpdateInput, Prisma.ProductUncheckedUpdateInput>;
};
export type ProductDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where: Prisma.ProductWhereUniqueInput;
};
export type ProductDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
    limit?: number;
};
export type Product$variantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductVariantSelect<ExtArgs> | null;
    omit?: Prisma.ProductVariantOmit<ExtArgs> | null;
    include?: Prisma.ProductVariantInclude<ExtArgs> | null;
    where?: Prisma.ProductVariantWhereInput;
    orderBy?: Prisma.ProductVariantOrderByWithRelationInput | Prisma.ProductVariantOrderByWithRelationInput[];
    cursor?: Prisma.ProductVariantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductVariantScalarFieldEnum | Prisma.ProductVariantScalarFieldEnum[];
};
export type ProductDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProductSelect<ExtArgs> | null;
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    include?: Prisma.ProductInclude<ExtArgs> | null;
};
export {};
