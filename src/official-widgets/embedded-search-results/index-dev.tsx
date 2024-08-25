import { WidgetType } from '../../common/visenze-core';
import { devInitWidget } from '../../common/client/initialization';
import { devConfigs, devFieldMappings } from './dev-configs';
import App from './app';

devInitWidget(
    WidgetType.EMBEDDED_SEARCH_RESULTS,
    ({ config, client, fieldMappings }) => <App productSearch={client} fieldMappings={fieldMappings} config={config}></App>,
    false,
    devConfigs,
    devFieldMappings,
    window,
);