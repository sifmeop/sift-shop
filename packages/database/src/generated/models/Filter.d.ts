import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FilterModel = runtime.Types.Result.DefaultSelection<Prisma.$FilterPayload>;
export type AggregateFilter = {
    _count: FilterCountAggregateOutputType | null;
    _avg: FilterAvgAggregateOutputType | null;
    _sum: FilterSumAggregateOutputType | null;
    _min: FilterMinAggregateOutputType | null;
    _max: FilterMaxAggregateOutputType | null;
};
export type FilterAvgAggregateOutputType = {
    position: number | null;
};
export type FilterSumAggregateOutputType = {
    position: number | null;
};
export type FilterMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    value: string | null;
    type: $Enums.FilterType | null;
    position: number | null;
    subcategoryId: string | null;
    createdAt: Date | null;
};
export type FilterMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    value: string | null;
    type: $Enums.FilterType | null;
    position: number | null;
    subcategoryId: string | null;
    createdAt: Date | null;
};
export type FilterCountAggregateOutputType = {
    id: number;
    name: number;
    value: number;
    type: number;
    position: number;
    subcategoryId: number;
    createdAt: number;
    _all: number;
};
export type FilterAvgAggregateInputType = {
    position?: true;
};
export type FilterSumAggregateInputType = {
    position?: true;
};
export type FilterMinAggregateInputType = {
    id?: true;
    name?: true;
    value?: true;
    type?: true;
    position?: true;
    subcategoryId?: true;
    createdAt?: true;
};
export type FilterMaxAggregateInputType = {
    id?: true;
    name?: true;
    value?: true;
    type?: true;
    position?: true;
    subcategoryId?: true;
    createdAt?: true;
};
export type FilterCountAggregateInputType = {
    id?: true;
    name?: true;
    value?: true;
    type?: true;
    position?: true;
    subcategoryId?: true;
    createdAt?: true;
    _all?: true;
};
export type FilterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterWhereInput;
    orderBy?: Prisma.FilterOrderByWithRelationInput | Prisma.FilterOrderByWithRelationInput[];
    cursor?: Prisma.FilterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FilterCountAggregateInputType;
    _avg?: FilterAvgAggregateInputType;
    _sum?: FilterSumAggregateInputType;
    _min?: FilterMinAggregateInputType;
    _max?: FilterMaxAggregateInputType;
};
export type GetFilterAggregateType<T extends FilterAggregateArgs> = {
    [P in keyof T & keyof AggregateFilter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFilter[P]> : Prisma.GetScalarType<T[P], AggregateFilter[P]>;
};
export type FilterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterWhereInput;
    orderBy?: Prisma.FilterOrderByWithAggregationInput | Prisma.FilterOrderByWithAggregationInput[];
    by: Prisma.FilterScalarFieldEnum[] | Prisma.FilterScalarFieldEnum;
    having?: Prisma.FilterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FilterCountAggregateInputType | true;
    _avg?: FilterAvgAggregateInputType;
    _sum?: FilterSumAggregateInputType;
    _min?: FilterMinAggregateInputType;
    _max?: FilterMaxAggregateInputType;
};
export type FilterGroupByOutputType = {
    id: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position: number;
    subcategoryId: string;
    createdAt: Date;
    _count: FilterCountAggregateOutputType | null;
    _avg: FilterAvgAggregateOutputType | null;
    _sum: FilterSumAggregateOutputType | null;
    _min: FilterMinAggregateOutputType | null;
    _max: FilterMaxAggregateOutputType | null;
};
type GetFilterGroupByPayload<T extends FilterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FilterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FilterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FilterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FilterGroupByOutputType[P]>;
}>>;
export type FilterWhereInput = {
    AND?: Prisma.FilterWhereInput | Prisma.FilterWhereInput[];
    OR?: Prisma.FilterWhereInput[];
    NOT?: Prisma.FilterWhereInput | Prisma.FilterWhereInput[];
    id?: Prisma.StringFilter<"Filter"> | string;
    name?: Prisma.StringFilter<"Filter"> | string;
    value?: Prisma.StringFilter<"Filter"> | string;
    type?: Prisma.EnumFilterTypeFilter<"Filter"> | $Enums.FilterType;
    position?: Prisma.IntFilter<"Filter"> | number;
    subcategoryId?: Prisma.StringFilter<"Filter"> | string;
    createdAt?: Prisma.DateTimeFilter<"Filter"> | Date | string;
    options?: Prisma.FilterOptionListRelationFilter;
    subcategory?: Prisma.XOR<Prisma.SubcategoryScalarRelationFilter, Prisma.SubcategoryWhereInput>;
};
export type FilterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    options?: Prisma.FilterOptionOrderByRelationAggregateInput;
    subcategory?: Prisma.SubcategoryOrderByWithRelationInput;
};
export type FilterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FilterWhereInput | Prisma.FilterWhereInput[];
    OR?: Prisma.FilterWhereInput[];
    NOT?: Prisma.FilterWhereInput | Prisma.FilterWhereInput[];
    name?: Prisma.StringFilter<"Filter"> | string;
    value?: Prisma.StringFilter<"Filter"> | string;
    type?: Prisma.EnumFilterTypeFilter<"Filter"> | $Enums.FilterType;
    position?: Prisma.IntFilter<"Filter"> | number;
    subcategoryId?: Prisma.StringFilter<"Filter"> | string;
    createdAt?: Prisma.DateTimeFilter<"Filter"> | Date | string;
    options?: Prisma.FilterOptionListRelationFilter;
    subcategory?: Prisma.XOR<Prisma.SubcategoryScalarRelationFilter, Prisma.SubcategoryWhereInput>;
}, "id">;
export type FilterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FilterCountOrderByAggregateInput;
    _avg?: Prisma.FilterAvgOrderByAggregateInput;
    _max?: Prisma.FilterMaxOrderByAggregateInput;
    _min?: Prisma.FilterMinOrderByAggregateInput;
    _sum?: Prisma.FilterSumOrderByAggregateInput;
};
export type FilterScalarWhereWithAggregatesInput = {
    AND?: Prisma.FilterScalarWhereWithAggregatesInput | Prisma.FilterScalarWhereWithAggregatesInput[];
    OR?: Prisma.FilterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FilterScalarWhereWithAggregatesInput | Prisma.FilterScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Filter"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Filter"> | string;
    value?: Prisma.StringWithAggregatesFilter<"Filter"> | string;
    type?: Prisma.EnumFilterTypeWithAggregatesFilter<"Filter"> | $Enums.FilterType;
    position?: Prisma.IntWithAggregatesFilter<"Filter"> | number;
    subcategoryId?: Prisma.StringWithAggregatesFilter<"Filter"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Filter"> | Date | string;
};
export type FilterCreateInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    createdAt?: Date | string;
    options?: Prisma.FilterOptionCreateNestedManyWithoutFilterInput;
    subcategory: Prisma.SubcategoryCreateNestedOneWithoutFiltersInput;
};
export type FilterUncheckedCreateInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    subcategoryId: string;
    createdAt?: Date | string;
    options?: Prisma.FilterOptionUncheckedCreateNestedManyWithoutFilterInput;
};
export type FilterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.FilterOptionUpdateManyWithoutFilterNestedInput;
    subcategory?: Prisma.SubcategoryUpdateOneRequiredWithoutFiltersNestedInput;
};
export type FilterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.FilterOptionUncheckedUpdateManyWithoutFilterNestedInput;
};
export type FilterCreateManyInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    subcategoryId: string;
    createdAt?: Date | string;
};
export type FilterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterListRelationFilter = {
    every?: Prisma.FilterWhereInput;
    some?: Prisma.FilterWhereInput;
    none?: Prisma.FilterWhereInput;
};
export type FilterOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FilterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FilterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    subcategoryId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FilterScalarRelationFilter = {
    is?: Prisma.FilterWhereInput;
    isNot?: Prisma.FilterWhereInput;
};
export type FilterCreateNestedManyWithoutSubcategoryInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput> | Prisma.FilterCreateWithoutSubcategoryInput[] | Prisma.FilterUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutSubcategoryInput | Prisma.FilterCreateOrConnectWithoutSubcategoryInput[];
    createMany?: Prisma.FilterCreateManySubcategoryInputEnvelope;
    connect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
};
export type FilterUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput> | Prisma.FilterCreateWithoutSubcategoryInput[] | Prisma.FilterUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutSubcategoryInput | Prisma.FilterCreateOrConnectWithoutSubcategoryInput[];
    createMany?: Prisma.FilterCreateManySubcategoryInputEnvelope;
    connect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
};
export type FilterUpdateManyWithoutSubcategoryNestedInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput> | Prisma.FilterCreateWithoutSubcategoryInput[] | Prisma.FilterUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutSubcategoryInput | Prisma.FilterCreateOrConnectWithoutSubcategoryInput[];
    upsert?: Prisma.FilterUpsertWithWhereUniqueWithoutSubcategoryInput | Prisma.FilterUpsertWithWhereUniqueWithoutSubcategoryInput[];
    createMany?: Prisma.FilterCreateManySubcategoryInputEnvelope;
    set?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    disconnect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    delete?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    connect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    update?: Prisma.FilterUpdateWithWhereUniqueWithoutSubcategoryInput | Prisma.FilterUpdateWithWhereUniqueWithoutSubcategoryInput[];
    updateMany?: Prisma.FilterUpdateManyWithWhereWithoutSubcategoryInput | Prisma.FilterUpdateManyWithWhereWithoutSubcategoryInput[];
    deleteMany?: Prisma.FilterScalarWhereInput | Prisma.FilterScalarWhereInput[];
};
export type FilterUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput> | Prisma.FilterCreateWithoutSubcategoryInput[] | Prisma.FilterUncheckedCreateWithoutSubcategoryInput[];
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutSubcategoryInput | Prisma.FilterCreateOrConnectWithoutSubcategoryInput[];
    upsert?: Prisma.FilterUpsertWithWhereUniqueWithoutSubcategoryInput | Prisma.FilterUpsertWithWhereUniqueWithoutSubcategoryInput[];
    createMany?: Prisma.FilterCreateManySubcategoryInputEnvelope;
    set?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    disconnect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    delete?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    connect?: Prisma.FilterWhereUniqueInput | Prisma.FilterWhereUniqueInput[];
    update?: Prisma.FilterUpdateWithWhereUniqueWithoutSubcategoryInput | Prisma.FilterUpdateWithWhereUniqueWithoutSubcategoryInput[];
    updateMany?: Prisma.FilterUpdateManyWithWhereWithoutSubcategoryInput | Prisma.FilterUpdateManyWithWhereWithoutSubcategoryInput[];
    deleteMany?: Prisma.FilterScalarWhereInput | Prisma.FilterScalarWhereInput[];
};
export type EnumFilterTypeFieldUpdateOperationsInput = {
    set?: $Enums.FilterType;
};
export type FilterCreateNestedOneWithoutOptionsInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutOptionsInput, Prisma.FilterUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutOptionsInput;
    connect?: Prisma.FilterWhereUniqueInput;
};
export type FilterUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: Prisma.XOR<Prisma.FilterCreateWithoutOptionsInput, Prisma.FilterUncheckedCreateWithoutOptionsInput>;
    connectOrCreate?: Prisma.FilterCreateOrConnectWithoutOptionsInput;
    upsert?: Prisma.FilterUpsertWithoutOptionsInput;
    connect?: Prisma.FilterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FilterUpdateToOneWithWhereWithoutOptionsInput, Prisma.FilterUpdateWithoutOptionsInput>, Prisma.FilterUncheckedUpdateWithoutOptionsInput>;
};
export type FilterCreateWithoutSubcategoryInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    createdAt?: Date | string;
    options?: Prisma.FilterOptionCreateNestedManyWithoutFilterInput;
};
export type FilterUncheckedCreateWithoutSubcategoryInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    createdAt?: Date | string;
    options?: Prisma.FilterOptionUncheckedCreateNestedManyWithoutFilterInput;
};
export type FilterCreateOrConnectWithoutSubcategoryInput = {
    where: Prisma.FilterWhereUniqueInput;
    create: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput>;
};
export type FilterCreateManySubcategoryInputEnvelope = {
    data: Prisma.FilterCreateManySubcategoryInput | Prisma.FilterCreateManySubcategoryInput[];
    skipDuplicates?: boolean;
};
export type FilterUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: Prisma.FilterWhereUniqueInput;
    update: Prisma.XOR<Prisma.FilterUpdateWithoutSubcategoryInput, Prisma.FilterUncheckedUpdateWithoutSubcategoryInput>;
    create: Prisma.XOR<Prisma.FilterCreateWithoutSubcategoryInput, Prisma.FilterUncheckedCreateWithoutSubcategoryInput>;
};
export type FilterUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: Prisma.FilterWhereUniqueInput;
    data: Prisma.XOR<Prisma.FilterUpdateWithoutSubcategoryInput, Prisma.FilterUncheckedUpdateWithoutSubcategoryInput>;
};
export type FilterUpdateManyWithWhereWithoutSubcategoryInput = {
    where: Prisma.FilterScalarWhereInput;
    data: Prisma.XOR<Prisma.FilterUpdateManyMutationInput, Prisma.FilterUncheckedUpdateManyWithoutSubcategoryInput>;
};
export type FilterScalarWhereInput = {
    AND?: Prisma.FilterScalarWhereInput | Prisma.FilterScalarWhereInput[];
    OR?: Prisma.FilterScalarWhereInput[];
    NOT?: Prisma.FilterScalarWhereInput | Prisma.FilterScalarWhereInput[];
    id?: Prisma.StringFilter<"Filter"> | string;
    name?: Prisma.StringFilter<"Filter"> | string;
    value?: Prisma.StringFilter<"Filter"> | string;
    type?: Prisma.EnumFilterTypeFilter<"Filter"> | $Enums.FilterType;
    position?: Prisma.IntFilter<"Filter"> | number;
    subcategoryId?: Prisma.StringFilter<"Filter"> | string;
    createdAt?: Prisma.DateTimeFilter<"Filter"> | Date | string;
};
export type FilterCreateWithoutOptionsInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    createdAt?: Date | string;
    subcategory: Prisma.SubcategoryCreateNestedOneWithoutFiltersInput;
};
export type FilterUncheckedCreateWithoutOptionsInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    subcategoryId: string;
    createdAt?: Date | string;
};
export type FilterCreateOrConnectWithoutOptionsInput = {
    where: Prisma.FilterWhereUniqueInput;
    create: Prisma.XOR<Prisma.FilterCreateWithoutOptionsInput, Prisma.FilterUncheckedCreateWithoutOptionsInput>;
};
export type FilterUpsertWithoutOptionsInput = {
    update: Prisma.XOR<Prisma.FilterUpdateWithoutOptionsInput, Prisma.FilterUncheckedUpdateWithoutOptionsInput>;
    create: Prisma.XOR<Prisma.FilterCreateWithoutOptionsInput, Prisma.FilterUncheckedCreateWithoutOptionsInput>;
    where?: Prisma.FilterWhereInput;
};
export type FilterUpdateToOneWithWhereWithoutOptionsInput = {
    where?: Prisma.FilterWhereInput;
    data: Prisma.XOR<Prisma.FilterUpdateWithoutOptionsInput, Prisma.FilterUncheckedUpdateWithoutOptionsInput>;
};
export type FilterUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subcategory?: Prisma.SubcategoryUpdateOneRequiredWithoutFiltersNestedInput;
};
export type FilterUncheckedUpdateWithoutOptionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    subcategoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterCreateManySubcategoryInput = {
    id?: string;
    name: string;
    value: string;
    type: $Enums.FilterType;
    position?: number;
    createdAt?: Date | string;
};
export type FilterUpdateWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.FilterOptionUpdateManyWithoutFilterNestedInput;
};
export type FilterUncheckedUpdateWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    options?: Prisma.FilterOptionUncheckedUpdateManyWithoutFilterNestedInput;
};
export type FilterUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterCountOutputType = {
    options: number;
};
export type FilterCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | FilterCountOutputTypeCountOptionsArgs;
};
export type FilterCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterCountOutputTypeSelect<ExtArgs> | null;
};
export type FilterCountOutputTypeCountOptionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterOptionWhereInput;
};
export type FilterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    value?: boolean;
    type?: boolean;
    position?: boolean;
    subcategoryId?: boolean;
    createdAt?: boolean;
    options?: boolean | Prisma.Filter$optionsArgs<ExtArgs>;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.FilterCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filter"]>;
export type FilterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    value?: boolean;
    type?: boolean;
    position?: boolean;
    subcategoryId?: boolean;
    createdAt?: boolean;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filter"]>;
export type FilterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    value?: boolean;
    type?: boolean;
    position?: boolean;
    subcategoryId?: boolean;
    createdAt?: boolean;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filter"]>;
export type FilterSelectScalar = {
    id?: boolean;
    name?: boolean;
    value?: boolean;
    type?: boolean;
    position?: boolean;
    subcategoryId?: boolean;
    createdAt?: boolean;
};
export type FilterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "value" | "type" | "position" | "subcategoryId" | "createdAt", ExtArgs["result"]["filter"]>;
export type FilterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    options?: boolean | Prisma.Filter$optionsArgs<ExtArgs>;
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
    _count?: boolean | Prisma.FilterCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FilterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
};
export type FilterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subcategory?: boolean | Prisma.SubcategoryDefaultArgs<ExtArgs>;
};
export type $FilterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Filter";
    objects: {
        options: Prisma.$FilterOptionPayload<ExtArgs>[];
        subcategory: Prisma.$SubcategoryPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        value: string;
        type: $Enums.FilterType;
        position: number;
        subcategoryId: string;
        createdAt: Date;
    }, ExtArgs["result"]["filter"]>;
    composites: {};
};
export type FilterGetPayload<S extends boolean | null | undefined | FilterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FilterPayload, S>;
export type FilterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FilterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FilterCountAggregateInputType | true;
};
export interface FilterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Filter'];
        meta: {
            name: 'Filter';
        };
    };
    findUnique<T extends FilterFindUniqueArgs>(args: Prisma.SelectSubset<T, FilterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FilterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FilterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FilterFindFirstArgs>(args?: Prisma.SelectSubset<T, FilterFindFirstArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FilterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FilterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FilterFindManyArgs>(args?: Prisma.SelectSubset<T, FilterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FilterCreateArgs>(args: Prisma.SelectSubset<T, FilterCreateArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FilterCreateManyArgs>(args?: Prisma.SelectSubset<T, FilterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FilterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FilterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FilterDeleteArgs>(args: Prisma.SelectSubset<T, FilterDeleteArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FilterUpdateArgs>(args: Prisma.SelectSubset<T, FilterUpdateArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FilterDeleteManyArgs>(args?: Prisma.SelectSubset<T, FilterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FilterUpdateManyArgs>(args: Prisma.SelectSubset<T, FilterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FilterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FilterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FilterUpsertArgs>(args: Prisma.SelectSubset<T, FilterUpsertArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FilterCountArgs>(args?: Prisma.Subset<T, FilterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FilterCountAggregateOutputType> : number>;
    aggregate<T extends FilterAggregateArgs>(args: Prisma.Subset<T, FilterAggregateArgs>): Prisma.PrismaPromise<GetFilterAggregateType<T>>;
    groupBy<T extends FilterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FilterGroupByArgs['orderBy'];
    } : {
        orderBy?: FilterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FilterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FilterFieldRefs;
}
export interface Prisma__FilterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    options<T extends Prisma.Filter$optionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Filter$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    subcategory<T extends Prisma.SubcategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubcategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__SubcategoryClient<runtime.Types.Result.GetResult<Prisma.$SubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FilterFieldRefs {
    readonly id: Prisma.FieldRef<"Filter", 'String'>;
    readonly name: Prisma.FieldRef<"Filter", 'String'>;
    readonly value: Prisma.FieldRef<"Filter", 'String'>;
    readonly type: Prisma.FieldRef<"Filter", 'FilterType'>;
    readonly position: Prisma.FieldRef<"Filter", 'Int'>;
    readonly subcategoryId: Prisma.FieldRef<"Filter", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Filter", 'DateTime'>;
}
export type FilterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    where: Prisma.FilterWhereUniqueInput;
};
export type FilterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    where: Prisma.FilterWhereUniqueInput;
};
export type FilterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterCreateInput, Prisma.FilterUncheckedCreateInput>;
};
export type FilterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FilterCreateManyInput | Prisma.FilterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FilterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    data: Prisma.FilterCreateManyInput | Prisma.FilterCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FilterIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FilterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterUpdateInput, Prisma.FilterUncheckedUpdateInput>;
    where: Prisma.FilterWhereUniqueInput;
};
export type FilterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FilterUpdateManyMutationInput, Prisma.FilterUncheckedUpdateManyInput>;
    where?: Prisma.FilterWhereInput;
    limit?: number;
};
export type FilterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterUpdateManyMutationInput, Prisma.FilterUncheckedUpdateManyInput>;
    where?: Prisma.FilterWhereInput;
    limit?: number;
    include?: Prisma.FilterIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FilterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    where: Prisma.FilterWhereUniqueInput;
    create: Prisma.XOR<Prisma.FilterCreateInput, Prisma.FilterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FilterUpdateInput, Prisma.FilterUncheckedUpdateInput>;
};
export type FilterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
    where: Prisma.FilterWhereUniqueInput;
};
export type FilterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterWhereInput;
    limit?: number;
};
export type Filter$optionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    where?: Prisma.FilterOptionWhereInput;
    orderBy?: Prisma.FilterOptionOrderByWithRelationInput | Prisma.FilterOptionOrderByWithRelationInput[];
    cursor?: Prisma.FilterOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FilterOptionScalarFieldEnum | Prisma.FilterOptionScalarFieldEnum[];
};
export type FilterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterSelect<ExtArgs> | null;
    omit?: Prisma.FilterOmit<ExtArgs> | null;
    include?: Prisma.FilterInclude<ExtArgs> | null;
};
export {};
