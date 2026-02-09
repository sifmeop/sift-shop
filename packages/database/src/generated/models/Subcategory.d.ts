import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SubcategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$SubcategoryPayload>;
export type AggregateSubcategory = {
    _count: SubcategoryCountAggregateOutputType | null;
    _min: SubcategoryMinAggregateOutputType | null;
    _max: SubcategoryMaxAggregateOutputType | null;
};
export type SubcategoryMinAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    image: string | null;
    categoryId: string | null;
    createdAt: Date | null;
};
export type SubcategoryMaxAggregateOutputType = {
    id: string | null;
    slug: string | null;
    name: string | null;
    image: string | null;
    categoryId: string | null;
    createdAt: Date | null;
};
export type SubcategoryCountAggregateOutputType = {
    id: number;
    slug: number;
    name: number;
    image: number;
    categoryId: number;
    createdAt: number;
    _all: number;
};
export type SubcategoryMinAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    image?: true;
    categoryId?: true;
    createdAt?: true;
};
export type SubcategoryMaxAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    image?: true;
    categoryId?: true;
    createdAt?: true;
};
export type SubcategoryCountAggregateInputType = {
    id?: true;
    slug?: true;
    name?: true;
    image?: true;
    categoryId?: true;
    createdAt?: true;
    _all?: true;
};
export type SubcategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubcategoryWhereInput;
    orderBy?: Prisma.SubcategoryOrderByWithRelationInput | Prisma.SubcategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubcategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubcategoryCountAggregateInputType;
    _min?: SubcategoryMinAggregateInputType;
    _max?: SubcategoryMaxAggregateInputType;
};
export type GetSubcategoryAggregateType<T extends SubcategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateSubcategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubcategory[P]> : Prisma.GetScalarType<T[P], AggregateSubcategory[P]>;
};
export type SubcategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubcategoryWhereInput;
    orderBy?: Prisma.SubcategoryOrderByWithAggregationInput | Prisma.SubcategoryOrderByWithAggregationInput[];
    by: Prisma.SubcategoryScalarFieldEnum[] | Prisma.SubcategoryScalarFieldEnum;
    having?: Prisma.SubcategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubcategoryCountAggregateInputType | true;
    _min?: SubcategoryMinAggregateInputType;
    _max?: SubcategoryMaxAggregateInputType;
};
export type SubcategoryGroupByOutputType = {
    id: string;
    slug: string;
    name: string;
    image: string;
    categoryId: string;
    createdAt: Date;
    _count: SubcategoryCountAggregateOutputType | null;
    _min: SubcategoryMinAggregateOutputType | null;
    _max: SubcategoryMaxAggregateOutputType | null;
};
type GetSubcategoryGroupByPayload<T extends SubcategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubcategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubcategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubcategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubcategoryGroupByOutputType[P]>;
}>>;
export type SubcategoryWhereInput = {
    AND?: Prisma.SubcategoryWhereInput | Prisma.SubcategoryWhereInput[];
    OR?: Prisma.SubcategoryWhereInput[];
    NOT?: Prisma.SubcategoryWhereInput | Prisma.SubcategoryWhereInput[];
    id?: Prisma.StringFilter<"Subcategory"> | string;
    slug?: Prisma.StringFilter<"Subcategory"> | string;
    name?: Prisma.StringFilter<"Subcategory"> | string;
    image?: Prisma.StringFilter<"Subcategory"> | string;
    categoryId?: Prisma.StringFilter<"Subcategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subcategory"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    products?: Prisma.ProductListRelationFilter;
    filters?: Prisma.FilterListRelationFilter;
};
export type SubcategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    category?: Prisma.CategoryOrderByWithRelationInput;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    filters?: Prisma.FilterOrderByRelationAggregateInput;
};
export type SubcategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    slug?: string;
    AND?: Prisma.SubcategoryWhereInput | Prisma.SubcategoryWhereInput[];
    OR?: Prisma.SubcategoryWhereInput[];
    NOT?: Prisma.SubcategoryWhereInput | Prisma.SubcategoryWhereInput[];
    name?: Prisma.StringFilter<"Subcategory"> | string;
    image?: Prisma.StringFilter<"Subcategory"> | string;
    categoryId?: Prisma.StringFilter<"Subcategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subcategory"> | Date | string;
    category?: Prisma.XOR<Prisma.CategoryScalarRelationFilter, Prisma.CategoryWhereInput>;
    products?: Prisma.ProductListRelationFilter;
    filters?: Prisma.FilterListRelationFilter;
}, "id" | "slug">;
export type SubcategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SubcategoryCountOrderByAggregateInput;
    _max?: Prisma.SubcategoryMaxOrderByAggregateInput;
    _min?: Prisma.SubcategoryMinOrderByAggregateInput;
};
export type SubcategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubcategoryScalarWhereWithAggregatesInput | Prisma.SubcategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubcategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubcategoryScalarWhereWithAggregatesInput | Prisma.SubcategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Subcategory"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"Subcategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Subcategory"> | string;
    image?: Prisma.StringWithAggregatesFilter<"Subcategory"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"Subcategory"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Subcategory"> | Date | string;
};
export type SubcategoryCreateInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubcategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutSubcategoryInput;
    filters?: Prisma.FilterCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryUncheckedCreateInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    categoryId: string;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutSubcategoryInput;
    filters?: Prisma.FilterUncheckedCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutSubcategoryNestedInput;
    filters?: Prisma.FilterUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutSubcategoryNestedInput;
    filters?: Prisma.FilterUncheckedUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryCreateManyInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    categoryId: string;
    createdAt?: Date | string;
};
export type SubcategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubcategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubcategoryScalarRelationFilter = {
    is?: Prisma.SubcategoryWhereInput;
    isNot?: Prisma.SubcategoryWhereInput;
};
export type SubcategoryListRelationFilter = {
    every?: Prisma.SubcategoryWhereInput;
    some?: Prisma.SubcategoryWhereInput;
    none?: Prisma.SubcategoryWhereInput;
};
export type SubcategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubcategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubcategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubcategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    image?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubcategoryCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutProductsInput, Prisma.SubcategoryUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutProductsInput;
    connect?: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutProductsInput, Prisma.SubcategoryUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.SubcategoryUpsertWithoutProductsInput;
    connect?: Prisma.SubcategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubcategoryUpdateToOneWithWhereWithoutProductsInput, Prisma.SubcategoryUpdateWithoutProductsInput>, Prisma.SubcategoryUncheckedUpdateWithoutProductsInput>;
};
export type SubcategoryCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubcategoryCreateWithoutCategoryInput[] | Prisma.SubcategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutCategoryInput | Prisma.SubcategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SubcategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
};
export type SubcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubcategoryCreateWithoutCategoryInput[] | Prisma.SubcategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutCategoryInput | Prisma.SubcategoryCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.SubcategoryCreateManyCategoryInputEnvelope;
    connect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
};
export type SubcategoryUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubcategoryCreateWithoutCategoryInput[] | Prisma.SubcategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutCategoryInput | Prisma.SubcategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SubcategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    disconnect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    delete?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    connect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    update?: Prisma.SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SubcategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.SubcategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SubcategoryScalarWhereInput | Prisma.SubcategoryScalarWhereInput[];
};
export type SubcategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput> | Prisma.SubcategoryCreateWithoutCategoryInput[] | Prisma.SubcategoryUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutCategoryInput | Prisma.SubcategoryCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.SubcategoryUpsertWithWhereUniqueWithoutCategoryInput | Prisma.SubcategoryUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.SubcategoryCreateManyCategoryInputEnvelope;
    set?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    disconnect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    delete?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    connect?: Prisma.SubcategoryWhereUniqueInput | Prisma.SubcategoryWhereUniqueInput[];
    update?: Prisma.SubcategoryUpdateWithWhereUniqueWithoutCategoryInput | Prisma.SubcategoryUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.SubcategoryUpdateManyWithWhereWithoutCategoryInput | Prisma.SubcategoryUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.SubcategoryScalarWhereInput | Prisma.SubcategoryScalarWhereInput[];
};
export type SubcategoryCreateNestedOneWithoutFiltersInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutFiltersInput, Prisma.SubcategoryUncheckedCreateWithoutFiltersInput>;
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutFiltersInput;
    connect?: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryUpdateOneRequiredWithoutFiltersNestedInput = {
    create?: Prisma.XOR<Prisma.SubcategoryCreateWithoutFiltersInput, Prisma.SubcategoryUncheckedCreateWithoutFiltersInput>;
    connectOrCreate?: Prisma.SubcategoryCreateOrConnectWithoutFiltersInput;
    upsert?: Prisma.SubcategoryUpsertWithoutFiltersInput;
    connect?: Prisma.SubcategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubcategoryUpdateToOneWithWhereWithoutFiltersInput, Prisma.SubcategoryUpdateWithoutFiltersInput>, Prisma.SubcategoryUncheckedUpdateWithoutFiltersInput>;
};
export type SubcategoryCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubcategoriesInput;
    filters?: Prisma.FilterCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryUncheckedCreateWithoutProductsInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    categoryId: string;
    createdAt?: Date | string;
    filters?: Prisma.FilterUncheckedCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryCreateOrConnectWithoutProductsInput = {
    where: Prisma.SubcategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutProductsInput, Prisma.SubcategoryUncheckedCreateWithoutProductsInput>;
};
export type SubcategoryUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.SubcategoryUpdateWithoutProductsInput, Prisma.SubcategoryUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutProductsInput, Prisma.SubcategoryUncheckedCreateWithoutProductsInput>;
    where?: Prisma.SubcategoryWhereInput;
};
export type SubcategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.SubcategoryWhereInput;
    data: Prisma.XOR<Prisma.SubcategoryUpdateWithoutProductsInput, Prisma.SubcategoryUncheckedUpdateWithoutProductsInput>;
};
export type SubcategoryUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput;
    filters?: Prisma.FilterUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    filters?: Prisma.FilterUncheckedUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryCreateWithoutCategoryInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
    products?: Prisma.ProductCreateNestedManyWithoutSubcategoryInput;
    filters?: Prisma.FilterCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryUncheckedCreateWithoutCategoryInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutSubcategoryInput;
    filters?: Prisma.FilterUncheckedCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryCreateOrConnectWithoutCategoryInput = {
    where: Prisma.SubcategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput>;
};
export type SubcategoryCreateManyCategoryInputEnvelope = {
    data: Prisma.SubcategoryCreateManyCategoryInput | Prisma.SubcategoryCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type SubcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SubcategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubcategoryUpdateWithoutCategoryInput, Prisma.SubcategoryUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutCategoryInput, Prisma.SubcategoryUncheckedCreateWithoutCategoryInput>;
};
export type SubcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.SubcategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubcategoryUpdateWithoutCategoryInput, Prisma.SubcategoryUncheckedUpdateWithoutCategoryInput>;
};
export type SubcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.SubcategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.SubcategoryUpdateManyMutationInput, Prisma.SubcategoryUncheckedUpdateManyWithoutCategoryInput>;
};
export type SubcategoryScalarWhereInput = {
    AND?: Prisma.SubcategoryScalarWhereInput | Prisma.SubcategoryScalarWhereInput[];
    OR?: Prisma.SubcategoryScalarWhereInput[];
    NOT?: Prisma.SubcategoryScalarWhereInput | Prisma.SubcategoryScalarWhereInput[];
    id?: Prisma.StringFilter<"Subcategory"> | string;
    slug?: Prisma.StringFilter<"Subcategory"> | string;
    name?: Prisma.StringFilter<"Subcategory"> | string;
    image?: Prisma.StringFilter<"Subcategory"> | string;
    categoryId?: Prisma.StringFilter<"Subcategory"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subcategory"> | Date | string;
};
export type SubcategoryCreateWithoutFiltersInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
    category: Prisma.CategoryCreateNestedOneWithoutSubcategoriesInput;
    products?: Prisma.ProductCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryUncheckedCreateWithoutFiltersInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    categoryId: string;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutSubcategoryInput;
};
export type SubcategoryCreateOrConnectWithoutFiltersInput = {
    where: Prisma.SubcategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutFiltersInput, Prisma.SubcategoryUncheckedCreateWithoutFiltersInput>;
};
export type SubcategoryUpsertWithoutFiltersInput = {
    update: Prisma.XOR<Prisma.SubcategoryUpdateWithoutFiltersInput, Prisma.SubcategoryUncheckedUpdateWithoutFiltersInput>;
    create: Prisma.XOR<Prisma.SubcategoryCreateWithoutFiltersInput, Prisma.SubcategoryUncheckedCreateWithoutFiltersInput>;
    where?: Prisma.SubcategoryWhereInput;
};
export type SubcategoryUpdateToOneWithWhereWithoutFiltersInput = {
    where?: Prisma.SubcategoryWhereInput;
    data: Prisma.XOR<Prisma.SubcategoryUpdateWithoutFiltersInput, Prisma.SubcategoryUncheckedUpdateWithoutFiltersInput>;
};
export type SubcategoryUpdateWithoutFiltersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.CategoryUpdateOneRequiredWithoutSubcategoriesNestedInput;
    products?: Prisma.ProductUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryUncheckedUpdateWithoutFiltersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryCreateManyCategoryInput = {
    id?: string;
    slug: string;
    name: string;
    image: string;
    createdAt?: Date | string;
};
export type SubcategoryUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUpdateManyWithoutSubcategoryNestedInput;
    filters?: Prisma.FilterUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutSubcategoryNestedInput;
    filters?: Prisma.FilterUncheckedUpdateManyWithoutSubcategoryNestedInput;
};
export type SubcategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    image?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubcategoryCountOutputType = {
    products: number;
    filters: number;
};
export type SubcategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | SubcategoryCountOutputTypeCountProductsArgs;
    filters?: boolean | SubcategoryCountOutputTypeCountFiltersArgs;
};
export type SubcategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategoryCountOutputTypeSelect<ExtArgs> | null;
};
export type SubcategoryCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
export type SubcategoryCountOutputTypeCountFiltersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterWhereInput;
};
export type SubcategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    image?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Subcategory$productsArgs<ExtArgs>;
    filters?: boolean | Prisma.Subcategory$filtersArgs<ExtArgs>;
    _count?: boolean | Prisma.SubcategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subcategory"]>;
export type SubcategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    image?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subcategory"]>;
export type SubcategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    image?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subcategory"]>;
export type SubcategorySelectScalar = {
    id?: boolean;
    slug?: boolean;
    name?: boolean;
    image?: boolean;
    categoryId?: boolean;
    createdAt?: boolean;
};
export type SubcategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slug" | "name" | "image" | "categoryId" | "createdAt", ExtArgs["result"]["subcategory"]>;
export type SubcategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Subcategory$productsArgs<ExtArgs>;
    filters?: boolean | Prisma.Subcategory$filtersArgs<ExtArgs>;
    _count?: boolean | Prisma.SubcategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubcategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type SubcategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.CategoryDefaultArgs<ExtArgs>;
};
export type $SubcategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Subcategory";
    objects: {
        category: Prisma.$CategoryPayload<ExtArgs>;
        products: Prisma.$ProductPayload<ExtArgs>[];
        filters: Prisma.$FilterPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slug: string;
        name: string;
        image: string;
        categoryId: string;
        createdAt: Date;
    }, ExtArgs["result"]["subcategory"]>;
    composites: {};
};
export type SubcategoryGetPayload<S extends boolean | null | undefined | SubcategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload, S>;
export type SubcategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubcategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubcategoryCountAggregateInputType | true;
};
export interface SubcategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Subcategory'];
        meta: {
            name: 'Subcategory';
        };
    };
    findUnique<T extends SubcategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, SubcategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SubcategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubcategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SubcategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, SubcategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SubcategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubcategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SubcategoryFindManyArgs>(args?: Prisma.SelectSubset<T, SubcategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SubcategoryCreateArgs>(args: Prisma.SelectSubset<T, SubcategoryCreateArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SubcategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, SubcategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SubcategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubcategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SubcategoryDeleteArgs>(args: Prisma.SelectSubset<T, SubcategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SubcategoryUpdateArgs>(args: Prisma.SelectSubset<T, SubcategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SubcategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubcategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SubcategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, SubcategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SubcategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubcategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SubcategoryUpsertArgs>(args: Prisma.SelectSubset<T, SubcategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SubcategoryCountArgs>(args?: Prisma.Subset<T, SubcategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubcategoryCountAggregateOutputType> : number>;
    aggregate<T extends SubcategoryAggregateArgs>(args: Prisma.Subset<T, SubcategoryAggregateArgs>): Prisma.PrismaPromise<GetSubcategoryAggregateType<T>>;
    groupBy<T extends SubcategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubcategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: SubcategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubcategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SubcategoryFieldRefs;
}
export interface Prisma__SubcategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.CategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    products<T extends Prisma.Subcategory$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subcategory$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    filters<T extends Prisma.Subcategory$filtersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subcategory$filtersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SubcategoryFieldRefs {
    readonly id: Prisma.FieldRef<"Subcategory", 'String'>;
    readonly slug: Prisma.FieldRef<"Subcategory", 'String'>;
    readonly name: Prisma.FieldRef<"Subcategory", 'String'>;
    readonly image: Prisma.FieldRef<"Subcategory", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Subcategory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Subcategory", 'DateTime'>;
}
export type SubcategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where?: Prisma.SubcategoryWhereInput;
    orderBy?: Prisma.SubcategoryOrderByWithRelationInput | Prisma.SubcategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubcategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubcategoryScalarFieldEnum | Prisma.SubcategoryScalarFieldEnum[];
};
export type SubcategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where?: Prisma.SubcategoryWhereInput;
    orderBy?: Prisma.SubcategoryOrderByWithRelationInput | Prisma.SubcategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubcategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubcategoryScalarFieldEnum | Prisma.SubcategoryScalarFieldEnum[];
};
export type SubcategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where?: Prisma.SubcategoryWhereInput;
    orderBy?: Prisma.SubcategoryOrderByWithRelationInput | Prisma.SubcategoryOrderByWithRelationInput[];
    cursor?: Prisma.SubcategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubcategoryScalarFieldEnum | Prisma.SubcategoryScalarFieldEnum[];
};
export type SubcategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubcategoryCreateInput, Prisma.SubcategoryUncheckedCreateInput>;
};
export type SubcategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SubcategoryCreateManyInput | Prisma.SubcategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubcategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    data: Prisma.SubcategoryCreateManyInput | Prisma.SubcategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SubcategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SubcategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubcategoryUpdateInput, Prisma.SubcategoryUncheckedUpdateInput>;
    where: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SubcategoryUpdateManyMutationInput, Prisma.SubcategoryUncheckedUpdateManyInput>;
    where?: Prisma.SubcategoryWhereInput;
    limit?: number;
};
export type SubcategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubcategoryUpdateManyMutationInput, Prisma.SubcategoryUncheckedUpdateManyInput>;
    where?: Prisma.SubcategoryWhereInput;
    limit?: number;
    include?: Prisma.SubcategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SubcategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where: Prisma.SubcategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubcategoryCreateInput, Prisma.SubcategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SubcategoryUpdateInput, Prisma.SubcategoryUncheckedUpdateInput>;
};
export type SubcategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
    where: Prisma.SubcategoryWhereUniqueInput;
};
export type SubcategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubcategoryWhereInput;
    limit?: number;
};
export type Subcategory$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Subcategory$filtersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    where?: Prisma.FilterWhereInput;
    orderBy?: Prisma.FilterOrderByWithRelationInput | Prisma.FilterOrderByWithRelationInput[];
    cursor?: Prisma.FilterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FilterScalarFieldEnum | Prisma.FilterScalarFieldEnum[];
};
export type SubcategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubcategorySelect<ExtArgs> | null;
    omit?: Prisma.SubcategoryOmit<ExtArgs> | null;
    include?: Prisma.SubcategoryInclude<ExtArgs> | null;
};
export {};
