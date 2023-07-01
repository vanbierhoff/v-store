export enum BuildStoreFlowNames {
    SELECT_TYPE = 'select_type',
    CREATE_FIELDS = 'create_fields',
    SET_ARGS = 'set_args',
    CREATE_INSTANCE = 'create_instance'
}


export const BUILD_STORE_FLOW =
    [BuildStoreFlowNames.SELECT_TYPE, BuildStoreFlowNames.CREATE_FIELDS,
        BuildStoreFlowNames.SET_ARGS, BuildStoreFlowNames.CREATE_INSTANCE
    ];
