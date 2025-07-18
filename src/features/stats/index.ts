import dynamic from 'next/dynamic';

import { statsSectionParser } from './parser';
import { defaultStatsSectionConfig } from './default-config';

import { events } from '@events';
import { PanelsEnum, Sections } from 'types';

const feature = {
  id: Sections.STATS,

  presentation: {
    [PanelsEnum.NEW_SECTION]: {
      icon: 'pie-chart',
      onClick: () => events.canvas.add(Sections.STATS),
      name: 'Stats',
    },

    sections: {
      component: dynamic(() =>
        import('./section').then(
          mod => mod.StatsSection,
          () => () => null
        )
      ),
      parser: {
        readme: statsSectionParser,
      },
      defaultConfig: defaultStatsSectionConfig,
    },

    panels: dynamic(() =>
      import('./panel').then(
        mod => mod.StatsEditPanel,
        () => () => null
      )
    ),
  },
};

events.extensions.register(feature);
