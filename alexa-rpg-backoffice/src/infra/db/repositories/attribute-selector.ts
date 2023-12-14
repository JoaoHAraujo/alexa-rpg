/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectLiteral, Repository } from 'typeorm';

export interface AttributeOptions {
  timestamps: boolean;
}

export function attributeSelector<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: AttributeOptions,
): Record<string, true> {
  try {
    const { timestamps } = options;
    const timestampAttributes = ['createdAt', 'updatedAt', 'deletedAt'];

    const response = repository.metadata?.columns.reduce(
      (attributes, column) => {
        if (!timestamps && timestampAttributes.includes(column.propertyName)) {
          return attributes;
        }

        attributes[column.propertyName] = true;
        return attributes;
      },
      {} as Record<string, true>,
    );

    return response;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
