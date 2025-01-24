import { Directive } from 'ask-sdk-model';
import { randomUUID } from 'crypto';

import { SlotsType } from '../enums';

export function generateDirective(slotType: SlotsType, values: string[]): Directive {
  return {
    type: 'Dialog.UpdateDynamicEntities',
    updateBehavior: 'REPLACE',
    types: [
      {
        name: slotType,
        values: values.map((value) => ({
          id: randomUUID(),
          name: {
            value: value,
          },
        })),
      },
    ],
  };
}
