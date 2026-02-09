import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FilterOptionModel = runtime.Types.Result.DefaultSelection<Prisma.$FilterOptionPayload>;
export type AggregateFilterOption = {
    _count: FilterOptionCountAggregateOutputType | null;
    _avg: FilterOptionAvgAggregateOutputType | null;
    _sum: FilterOptionSumAggregateOutputType | null;
    _min: FilterOptionMinAggregateOutputType | null;
    _max: FilterOptionMaxAggregateOutputType | null;
};
export type FilterOptionAvgAggregateOutputType = {
    position: number | null;
};
export type FilterOptionSumAggregateOutputType = {
    position: number | null;
};
export type FilterOptionMinAggregateOutputType = {
    id: string | null;
    value: string | null;
    label: string | null;
    position: number | null;
    filterId: string | null;
    createdAt: Date | null;
};
export type FilterOptionMaxAggregateOutputType = {
    id: string | null;
    value: string | null;
    label: string | null;
    position: number | null;
    filterId: string | null;
    createdAt: Date | null;
};
export type FilterOptionCountAggregateOutputType = {
    id: number;
    value: number;
    label: number;
    position: number;
    filterId: number;
    createdAt: number;
    _all: number;
};
export type FilterOptionAvgAggregateInputType = {
    position?: true;
};
export type FilterOptionSumAggregateInputType = {
    position?: true;
};
export type FilterOptionMinAggregateInputType = {
    id?: true;
    value?: true;
    label?: true;
    position?: true;
    filterId?: true;
    createdAt?: true;
};
export type FilterOptionMaxAggregateInputType = {
    id?: true;
    value?: true;
    label?: true;
    position?: true;
    filterId?: true;
    createdAt?: true;
};
export type FilterOptionCountAggregateInputType = {
    id?: true;
    value?: true;
    label?: true;
    position?: true;
    filterId?: true;
    createdAt?: true;
    _all?: true;
};
export type FilterOptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterOptionWhereInput;
    orderBy?: Prisma.FilterOptionOrderByWithRelationInput | Prisma.FilterOptionOrderByWithRelationInput[];
    cursor?: Prisma.FilterOptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FilterOptionCountAggregateInputType;
    _avg?: FilterOptionAvgAggregateInputType;
    _sum?: FilterOptionSumAggregateInputType;
    _min?: FilterOptionMinAggregateInputType;
    _max?: FilterOptionMaxAggregateInputType;
};
export type GetFilterOptionAggregateType<T extends FilterOptionAggregateArgs> = {
    [P in keyof T & keyof AggregateFilterOption]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFilterOption[P]> : Prisma.GetScalarType<T[P], AggregateFilterOption[P]>;
};
export type FilterOptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterOptionWhereInput;
    orderBy?: Prisma.FilterOptionOrderByWithAggregationInput | Prisma.FilterOptionOrderByWithAggregationInput[];
    by: Prisma.FilterOptionScalarFieldEnum[] | Prisma.FilterOptionScalarFieldEnum;
    having?: Prisma.FilterOptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FilterOptionCountAggregateInputType | true;
    _avg?: FilterOptionAvgAggregateInputType;
    _sum?: FilterOptionSumAggregateInputType;
    _min?: FilterOptionMinAggregateInputType;
    _max?: FilterOptionMaxAggregateInputType;
};
export type FilterOptionGroupByOutputType = {
    id: string;
    value: string;
    label: string;
    position: number;
    filterId: string;
    createdAt: Date;
    _count: FilterOptionCountAggregateOutputType | null;
    _avg: FilterOptionAvgAggregateOutputType | null;
    _sum: FilterOptionSumAggregateOutputType | null;
    _min: FilterOptionMinAggregateOutputType | null;
    _max: FilterOptionMaxAggregateOutputType | null;
};
type GetFilterOptionGroupByPayload<T extends FilterOptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FilterOptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FilterOptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FilterOptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FilterOptionGroupByOutputType[P]>;
}>>;
export type FilterOptionWhereInput = {
    AND?: Prisma.FilterOptionWhereInput | Prisma.FilterOptionWhereInput[];
    OR?: Prisma.FilterOptionWhereInput[];
    NOT?: Prisma.FilterOptionWhereInput | Prisma.FilterOptionWhereInput[];
    id?: Prisma.StringFilter<"FilterOption"> | string;
    value?: Prisma.StringFilter<"FilterOption"> | string;
    label?: Prisma.StringFilter<"FilterOption"> | string;
    position?: Prisma.IntFilter<"FilterOption"> | number;
    filterId?: Prisma.StringFilter<"FilterOption"> | string;
    createdAt?: Prisma.DateTimeFilter<"FilterOption"> | Date | string;
    filter?: Prisma.XOR<Prisma.FilterScalarRelationFilter, Prisma.FilterWhereInput>;
};
export type FilterOptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    filterId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    filter?: Prisma.FilterOrderByWithRelationInput;
};
export type FilterOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FilterOptionWhereInput | Prisma.FilterOptionWhereInput[];
    OR?: Prisma.FilterOptionWhereInput[];
    NOT?: Prisma.FilterOptionWhereInput | Prisma.FilterOptionWhereInput[];
    value?: Prisma.StringFilter<"FilterOption"> | string;
    label?: Prisma.StringFilter<"FilterOption"> | string;
    position?: Prisma.IntFilter<"FilterOption"> | number;
    filterId?: Prisma.StringFilter<"FilterOption"> | string;
    createdAt?: Prisma.DateTimeFilter<"FilterOption"> | Date | string;
    filter?: Prisma.XOR<Prisma.FilterScalarRelationFilter, Prisma.FilterWhereInput>;
}, "id">;
export type FilterOptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    filterId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FilterOptionCountOrderByAggregateInput;
    _avg?: Prisma.FilterOptionAvgOrderByAggregateInput;
    _max?: Prisma.FilterOptionMaxOrderByAggregateInput;
    _min?: Prisma.FilterOptionMinOrderByAggregateInput;
    _sum?: Prisma.FilterOptionSumOrderByAggregateInput;
};
export type FilterOptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.FilterOptionScalarWhereWithAggregatesInput | Prisma.FilterOptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.FilterOptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FilterOptionScalarWhereWithAggregatesInput | Prisma.FilterOptionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FilterOption"> | string;
    value?: Prisma.StringWithAggregatesFilter<"FilterOption"> | string;
    label?: Prisma.StringWithAggregatesFilter<"FilterOption"> | string;
    position?: Prisma.IntWithAggregatesFilter<"FilterOption"> | number;
    filterId?: Prisma.StringWithAggregatesFilter<"FilterOption"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FilterOption"> | Date | string;
};
export type FilterOptionCreateInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    createdAt?: Date | string;
    filter: Prisma.FilterCreateNestedOneWithoutOptionsInput;
};
export type FilterOptionUncheckedCreateInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    filterId: string;
    createdAt?: Date | string;
};
export type FilterOptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    filter?: Prisma.FilterUpdateOneRequiredWithoutOptionsNestedInput;
};
export type FilterOptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    filterId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionCreateManyInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    filterId: string;
    createdAt?: Date | string;
};
export type FilterOptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    filterId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionListRelationFilter = {
    every?: Prisma.FilterOptionWhereInput;
    some?: Prisma.FilterOptionWhereInput;
    none?: Prisma.FilterOptionWhereInput;
};
export type FilterOptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FilterOptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    filterId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterOptionAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FilterOptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    filterId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterOptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    value?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    filterId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FilterOptionSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
};
export type FilterOptionCreateNestedManyWithoutFilterInput = {
    create?: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput> | Prisma.FilterOptionCreateWithoutFilterInput[] | Prisma.FilterOptionUncheckedCreateWithoutFilterInput[];
    connectOrCreate?: Prisma.FilterOptionCreateOrConnectWithoutFilterInput | Prisma.FilterOptionCreateOrConnectWithoutFilterInput[];
    createMany?: Prisma.FilterOptionCreateManyFilterInputEnvelope;
    connect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
};
export type FilterOptionUncheckedCreateNestedManyWithoutFilterInput = {
    create?: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput> | Prisma.FilterOptionCreateWithoutFilterInput[] | Prisma.FilterOptionUncheckedCreateWithoutFilterInput[];
    connectOrCreate?: Prisma.FilterOptionCreateOrConnectWithoutFilterInput | Prisma.FilterOptionCreateOrConnectWithoutFilterInput[];
    createMany?: Prisma.FilterOptionCreateManyFilterInputEnvelope;
    connect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
};
export type FilterOptionUpdateManyWithoutFilterNestedInput = {
    create?: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput> | Prisma.FilterOptionCreateWithoutFilterInput[] | Prisma.FilterOptionUncheckedCreateWithoutFilterInput[];
    connectOrCreate?: Prisma.FilterOptionCreateOrConnectWithoutFilterInput | Prisma.FilterOptionCreateOrConnectWithoutFilterInput[];
    upsert?: Prisma.FilterOptionUpsertWithWhereUniqueWithoutFilterInput | Prisma.FilterOptionUpsertWithWhereUniqueWithoutFilterInput[];
    createMany?: Prisma.FilterOptionCreateManyFilterInputEnvelope;
    set?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    disconnect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    delete?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    connect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    update?: Prisma.FilterOptionUpdateWithWhereUniqueWithoutFilterInput | Prisma.FilterOptionUpdateWithWhereUniqueWithoutFilterInput[];
    updateMany?: Prisma.FilterOptionUpdateManyWithWhereWithoutFilterInput | Prisma.FilterOptionUpdateManyWithWhereWithoutFilterInput[];
    deleteMany?: Prisma.FilterOptionScalarWhereInput | Prisma.FilterOptionScalarWhereInput[];
};
export type FilterOptionUncheckedUpdateManyWithoutFilterNestedInput = {
    create?: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput> | Prisma.FilterOptionCreateWithoutFilterInput[] | Prisma.FilterOptionUncheckedCreateWithoutFilterInput[];
    connectOrCreate?: Prisma.FilterOptionCreateOrConnectWithoutFilterInput | Prisma.FilterOptionCreateOrConnectWithoutFilterInput[];
    upsert?: Prisma.FilterOptionUpsertWithWhereUniqueWithoutFilterInput | Prisma.FilterOptionUpsertWithWhereUniqueWithoutFilterInput[];
    createMany?: Prisma.FilterOptionCreateManyFilterInputEnvelope;
    set?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    disconnect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    delete?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    connect?: Prisma.FilterOptionWhereUniqueInput | Prisma.FilterOptionWhereUniqueInput[];
    update?: Prisma.FilterOptionUpdateWithWhereUniqueWithoutFilterInput | Prisma.FilterOptionUpdateWithWhereUniqueWithoutFilterInput[];
    updateMany?: Prisma.FilterOptionUpdateManyWithWhereWithoutFilterInput | Prisma.FilterOptionUpdateManyWithWhereWithoutFilterInput[];
    deleteMany?: Prisma.FilterOptionScalarWhereInput | Prisma.FilterOptionScalarWhereInput[];
};
export type FilterOptionCreateWithoutFilterInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    createdAt?: Date | string;
};
export type FilterOptionUncheckedCreateWithoutFilterInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    createdAt?: Date | string;
};
export type FilterOptionCreateOrConnectWithoutFilterInput = {
    where: Prisma.FilterOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput>;
};
export type FilterOptionCreateManyFilterInputEnvelope = {
    data: Prisma.FilterOptionCreateManyFilterInput | Prisma.FilterOptionCreateManyFilterInput[];
    skipDuplicates?: boolean;
};
export type FilterOptionUpsertWithWhereUniqueWithoutFilterInput = {
    where: Prisma.FilterOptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FilterOptionUpdateWithoutFilterInput, Prisma.FilterOptionUncheckedUpdateWithoutFilterInput>;
    create: Prisma.XOR<Prisma.FilterOptionCreateWithoutFilterInput, Prisma.FilterOptionUncheckedCreateWithoutFilterInput>;
};
export type FilterOptionUpdateWithWhereUniqueWithoutFilterInput = {
    where: Prisma.FilterOptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FilterOptionUpdateWithoutFilterInput, Prisma.FilterOptionUncheckedUpdateWithoutFilterInput>;
};
export type FilterOptionUpdateManyWithWhereWithoutFilterInput = {
    where: Prisma.FilterOptionScalarWhereInput;
    data: Prisma.XOR<Prisma.FilterOptionUpdateManyMutationInput, Prisma.FilterOptionUncheckedUpdateManyWithoutFilterInput>;
};
export type FilterOptionScalarWhereInput = {
    AND?: Prisma.FilterOptionScalarWhereInput | Prisma.FilterOptionScalarWhereInput[];
    OR?: Prisma.FilterOptionScalarWhereInput[];
    NOT?: Prisma.FilterOptionScalarWhereInput | Prisma.FilterOptionScalarWhereInput[];
    id?: Prisma.StringFilter<"FilterOption"> | string;
    value?: Prisma.StringFilter<"FilterOption"> | string;
    label?: Prisma.StringFilter<"FilterOption"> | string;
    position?: Prisma.IntFilter<"FilterOption"> | number;
    filterId?: Prisma.StringFilter<"FilterOption"> | string;
    createdAt?: Prisma.DateTimeFilter<"FilterOption"> | Date | string;
};
export type FilterOptionCreateManyFilterInput = {
    id?: string;
    value: string;
    label: string;
    position?: number;
    createdAt?: Date | string;
};
export type FilterOptionUpdateWithoutFilterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionUncheckedUpdateWithoutFilterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionUncheckedUpdateManyWithoutFilterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    value?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FilterOptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    value?: boolean;
    label?: boolean;
    position?: boolean;
    filterId?: boolean;
    createdAt?: boolean;
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filterOption"]>;
export type FilterOptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    value?: boolean;
    label?: boolean;
    position?: boolean;
    filterId?: boolean;
    createdAt?: boolean;
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filterOption"]>;
export type FilterOptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    value?: boolean;
    label?: boolean;
    position?: boolean;
    filterId?: boolean;
    createdAt?: boolean;
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["filterOption"]>;
export type FilterOptionSelectScalar = {
    id?: boolean;
    value?: boolean;
    label?: boolean;
    position?: boolean;
    filterId?: boolean;
    createdAt?: boolean;
};
export type FilterOptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "value" | "label" | "position" | "filterId" | "createdAt", ExtArgs["result"]["filterOption"]>;
export type FilterOptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
};
export type FilterOptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
};
export type FilterOptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    filter?: boolean | Prisma.FilterDefaultArgs<ExtArgs>;
};
export type $FilterOptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FilterOption";
    objects: {
        filter: Prisma.$FilterPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        value: string;
        label: string;
        position: number;
        filterId: string;
        createdAt: Date;
    }, ExtArgs["result"]["filterOption"]>;
    composites: {};
};
export type FilterOptionGetPayload<S extends boolean | null | undefined | FilterOptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload, S>;
export type FilterOptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FilterOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FilterOptionCountAggregateInputType | true;
};
export interface FilterOptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FilterOption'];
        meta: {
            name: 'FilterOption';
        };
    };
    findUnique<T extends FilterOptionFindUniqueArgs>(args: Prisma.SelectSubset<T, FilterOptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FilterOptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FilterOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FilterOptionFindFirstArgs>(args?: Prisma.SelectSubset<T, FilterOptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FilterOptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FilterOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FilterOptionFindManyArgs>(args?: Prisma.SelectSubset<T, FilterOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FilterOptionCreateArgs>(args: Prisma.SelectSubset<T, FilterOptionCreateArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FilterOptionCreateManyArgs>(args?: Prisma.SelectSubset<T, FilterOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FilterOptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FilterOptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FilterOptionDeleteArgs>(args: Prisma.SelectSubset<T, FilterOptionDeleteArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FilterOptionUpdateArgs>(args: Prisma.SelectSubset<T, FilterOptionUpdateArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FilterOptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, FilterOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FilterOptionUpdateManyArgs>(args: Prisma.SelectSubset<T, FilterOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FilterOptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FilterOptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FilterOptionUpsertArgs>(args: Prisma.SelectSubset<T, FilterOptionUpsertArgs<ExtArgs>>): Prisma.Prisma__FilterOptionClient<runtime.Types.Result.GetResult<Prisma.$FilterOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FilterOptionCountArgs>(args?: Prisma.Subset<T, FilterOptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FilterOptionCountAggregateOutputType> : number>;
    aggregate<T extends FilterOptionAggregateArgs>(args: Prisma.Subset<T, FilterOptionAggregateArgs>): Prisma.PrismaPromise<GetFilterOptionAggregateType<T>>;
    groupBy<T extends FilterOptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FilterOptionGroupByArgs['orderBy'];
    } : {
        orderBy?: FilterOptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FilterOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FilterOptionFieldRefs;
}
export interface Prisma__FilterOptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    filter<T extends Prisma.FilterDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FilterDefaultArgs<ExtArgs>>): Prisma.Prisma__FilterClient<runtime.Types.Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FilterOptionFieldRefs {
    readonly id: Prisma.FieldRef<"FilterOption", 'String'>;
    readonly value: Prisma.FieldRef<"FilterOption", 'String'>;
    readonly label: Prisma.FieldRef<"FilterOption", 'String'>;
    readonly position: Prisma.FieldRef<"FilterOption", 'Int'>;
    readonly filterId: Prisma.FieldRef<"FilterOption", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FilterOption", 'DateTime'>;
}
export type FilterOptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    where: Prisma.FilterOptionWhereUniqueInput;
};
export type FilterOptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    where: Prisma.FilterOptionWhereUniqueInput;
};
export type FilterOptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterOptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterOptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FilterOptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterOptionCreateInput, Prisma.FilterOptionUncheckedCreateInput>;
};
export type FilterOptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FilterOptionCreateManyInput | Prisma.FilterOptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FilterOptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    data: Prisma.FilterOptionCreateManyInput | Prisma.FilterOptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FilterOptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FilterOptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterOptionUpdateInput, Prisma.FilterOptionUncheckedUpdateInput>;
    where: Prisma.FilterOptionWhereUniqueInput;
};
export type FilterOptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FilterOptionUpdateManyMutationInput, Prisma.FilterOptionUncheckedUpdateManyInput>;
    where?: Prisma.FilterOptionWhereInput;
    limit?: number;
};
export type FilterOptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FilterOptionUpdateManyMutationInput, Prisma.FilterOptionUncheckedUpdateManyInput>;
    where?: Prisma.FilterOptionWhereInput;
    limit?: number;
    include?: Prisma.FilterOptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FilterOptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    where: Prisma.FilterOptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FilterOptionCreateInput, Prisma.FilterOptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FilterOptionUpdateInput, Prisma.FilterOptionUncheckedUpdateInput>;
};
export type FilterOptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
    where: Prisma.FilterOptionWhereUniqueInput;
};
export type FilterOptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FilterOptionWhereInput;
    limit?: number;
};
export type FilterOptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FilterOptionSelect<ExtArgs> | null;
    omit?: Prisma.FilterOptionOmit<ExtArgs> | null;
    include?: Prisma.FilterOptionInclude<ExtArgs> | null;
};
export {};
