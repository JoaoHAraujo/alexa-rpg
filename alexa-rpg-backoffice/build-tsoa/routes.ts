/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ActionController } from './../src/controllers/v1/action.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../src/controllers/v1/admin.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../src/controllers/v1/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthController } from './../src/controllers/v1/health.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SegmentController } from './../src/controllers/v1/segment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoryController } from './../src/controllers/v1/story.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagController } from './../src/controllers/v1/tag.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserProgressController } from './../src/controllers/v1/user-progress.controller';
import { iocContainer } from './../src/server';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "TBaseModel": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"deletedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"updatedAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"createdAt":{"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"string"}]},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TSegmentModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"actions":{"dataType":"array","array":{"dataType":"refAlias","ref":"TActionModel"}},"story":{"ref":"TStoryModel"},"isFirst":{"dataType":"boolean","required":true},"tags":{"dataType":"array","array":{"dataType":"string"},"required":true},"narrative":{"dataType":"string","required":true},"idStory":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagTypes": {
        "dataType": "refEnum",
        "enums": ["SEGMENT","ACTION"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TStoryModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"tags":{"dataType":"array","array":{"dataType":"refAlias","ref":"TTagModel"}},"segments":{"dataType":"array","array":{"dataType":"refAlias","ref":"TSegmentModel"}},"ageClass":{"dataType":"double","required":true},"isActive":{"dataType":"boolean","required":true},"title":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TTagModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"story":{"ref":"TStoryModel","required":true},"idStory":{"dataType":"string","required":true},"type":{"ref":"TagTypes","required":true},"name":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TActionModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"segmentFailure":{"ref":"TSegmentModel"},"segmentSuccess":{"ref":"TSegmentModel"},"originSegment":{"ref":"TSegmentModel"},"tags":{"dataType":"array","array":{"dataType":"string"},"required":true},"description":{"dataType":"string","required":true},"successRate":{"dataType":"double","required":true},"idSegmentFailure":{"dataType":"string"},"idSegmentSuccess":{"dataType":"string","required":true},"idOriginSegment":{"dataType":"string","required":true},"idStory":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TActionModel.Exclude_keyofTActionModel.id-or-idStory-or-createdAt-or-updatedAt-or-deletedAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idOriginSegment":{"dataType":"string","required":true},"idSegmentSuccess":{"dataType":"string","required":true},"idSegmentFailure":{"dataType":"string"},"successRate":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"tags":{"dataType":"array","array":{"dataType":"string"},"required":true},"originSegment":{"ref":"TSegmentModel"},"segmentSuccess":{"ref":"TSegmentModel"},"segmentFailure":{"ref":"TSegmentModel"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_TActionModel.id-or-idStory-or-createdAt-or-updatedAt-or-deletedAt_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TActionModel.Exclude_keyofTActionModel.id-or-idStory-or-createdAt-or-updatedAt-or-deletedAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TCreateActionInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_TActionModel.id-or-idStory-or-createdAt-or-updatedAt-or-deletedAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TPagination_TActionModel_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pagination":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"totalPages":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"page":{"dataType":"double","required":true},"totalRows":{"dataType":"double","required":true}},"required":true},"rows":{"dataType":"array","array":{"dataType":"refAlias","ref":"TActionModel"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TSuccessRateComparator": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["lt"]},{"dataType":"enum","enums":["lte"]},{"dataType":"enum","enums":["bt"]},{"dataType":"enum","enums":["bte"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TActionModel.description-or-idOriginSegment-or-idSegmentFailure-or-idSegmentSuccess-or-successRate-or-tags_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idOriginSegment":{"dataType":"string","required":true},"idSegmentSuccess":{"dataType":"string","required":true},"idSegmentFailure":{"dataType":"string"},"successRate":{"dataType":"double","required":true},"description":{"dataType":"string","required":true},"tags":{"dataType":"array","array":{"dataType":"string"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUpdateActionInput": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TActionModel.description-or-idOriginSegment-or-idSegmentFailure-or-idSegmentSuccess-or-successRate-or-tags_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TAdminModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TAdminModel.name-or-email-or-password_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"password":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TCreateAdminInput": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TAdminModel.name-or-email-or-password_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TPagination_TAdminModel_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pagination":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"totalPages":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"page":{"dataType":"double","required":true},"totalRows":{"dataType":"double","required":true}},"required":true},"rows":{"dataType":"array","array":{"dataType":"refAlias","ref":"TAdminModel"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Pick_TAdminModel.name-or-email-or-password__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"},"email":{"dataType":"string"},"password":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUpdateAdminInput": {
        "dataType": "refAlias",
        "type": {"ref":"Partial_Pick_TAdminModel.name-or-email-or-password__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TLoginOutput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"token":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TLoginInput": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Environment": {
        "dataType": "refEnum",
        "enums": ["development","homolog","production"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IHealthStatus": {
        "dataType": "refObject",
        "properties": {
            "app": {"dataType":"string","required":true},
            "uptime": {"dataType":"double","required":true},
            "now": {"dataType":"string","required":true},
            "env": {"ref":"Environment","required":true},
            "databaseOn": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "interfaces.IHttpActionResult": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TPagination_TSegmentModel_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pagination":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"totalPages":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"page":{"dataType":"double","required":true},"totalRows":{"dataType":"double","required":true}},"required":true},"rows":{"dataType":"array","array":{"dataType":"refAlias","ref":"TSegmentModel"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TSegmentModel.Exclude_keyofTSegmentModel.id-or-isFirst-or-createdAt-or-updatedAt-or-deletedAt-or-story-or-actions__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idStory":{"dataType":"string","required":true},"tags":{"dataType":"array","array":{"dataType":"string"},"required":true},"narrative":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_TSegmentModel.id-or-isFirst-or-createdAt-or-updatedAt-or-deletedAt-or-story-or-actions_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TSegmentModel.Exclude_keyofTSegmentModel.id-or-isFirst-or-createdAt-or-updatedAt-or-deletedAt-or-story-or-actions__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TCreateSegmentInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_TSegmentModel.id-or-isFirst-or-createdAt-or-updatedAt-or-deletedAt-or-story-or-actions_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TSegmentModel.narrative-or-tags_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"tags":{"dataType":"array","array":{"dataType":"string"},"required":true},"narrative":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUpdateSegmentInput": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TSegmentModel.narrative-or-tags_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TStoryModel.Exclude_keyofTStoryModel.id-or-createdAt-or-updatedAt-or-deletedAt__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"tags":{"dataType":"array","array":{"dataType":"refAlias","ref":"TTagModel"}},"title":{"dataType":"string","required":true},"isActive":{"dataType":"boolean","required":true},"ageClass":{"dataType":"double","required":true},"segments":{"dataType":"array","array":{"dataType":"refAlias","ref":"TSegmentModel"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_TStoryModel.id-or-createdAt-or-updatedAt-or-deletedAt_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TStoryModel.Exclude_keyofTStoryModel.id-or-createdAt-or-updatedAt-or-deletedAt__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TCreateStoryInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_TStoryModel.id-or-createdAt-or-updatedAt-or-deletedAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TGetStoryByIdResponse": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TStoryModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"firstSegment":{"ref":"TSegmentModel","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUpdateStoryInput": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_TStoryModel.id-or-createdAt-or-updatedAt-or-deletedAt_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TPagination_TTagModel_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"pagination":{"dataType":"nestedObjectLiteral","nestedProperties":{"hasPreviousPage":{"dataType":"boolean","required":true},"hasNextPage":{"dataType":"boolean","required":true},"totalPages":{"dataType":"double","required":true},"pageSize":{"dataType":"double","required":true},"page":{"dataType":"double","required":true},"totalRows":{"dataType":"double","required":true}},"required":true},"rows":{"dataType":"array","array":{"dataType":"refAlias","ref":"TTagModel"},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUserProgressModel": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"TBaseModel"},{"dataType":"nestedObjectLiteral","nestedProperties":{"story":{"ref":"TStoryModel"},"segment":{"ref":"TSegmentModel"},"finalized":{"dataType":"boolean","required":true},"idSegment":{"dataType":"string","required":true},"idStory":{"dataType":"string","required":true},"idAmazon":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_TUpsertUserProgressInput.idNewSegment-or-idStory_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"idStory":{"dataType":"string","required":true},"idNewSegment":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TUpsertPayload": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TUpsertUserProgressInput.idNewSegment-or-idStory_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/v1/action',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.create)),

            async function ActionController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TCreateActionInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/action/per-segment/:idSegment',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.getAction)),

            async function ActionController_getAction(request: any, response: any, next: any) {
            const args = {
                    idSegment: {"in":"path","name":"idSegment","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAction.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/action/:idAction',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.getById)),

            async function ActionController_getById(request: any, response: any, next: any) {
            const args = {
                    idAction: {"in":"path","name":"idAction","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/action/all/:idStory',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.getAllPaginated)),

            async function ActionController_getAllPaginated(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
                    description: {"in":"query","name":"description","dataType":"string"},
                    tags: {"in":"query","name":"tags","dataType":"string"},
                    successRate: {"in":"query","name":"successRate","dataType":"double"},
                    successRateComparator: {"in":"query","name":"successRateComparator","ref":"TSuccessRateComparator"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    pageSize: {"default":30,"in":"query","name":"pageSize","dataType":"double"},
                    orderBy: {"in":"query","name":"orderBy","dataType":"union","subSchemas":[{"dataType":"enum","enums":["description"]},{"dataType":"enum","enums":["successRate"]}]},
                    isDesc: {"in":"query","name":"isDesc","dataType":"union","subSchemas":[{"dataType":"enum","enums":["true"]},{"dataType":"enum","enums":["false"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllPaginated.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/action/:idAction',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.update)),

            async function ActionController_update(request: any, response: any, next: any) {
            const args = {
                    idAction: {"in":"path","name":"idAction","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TUpdateActionInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/action/:idAction',
            ...(fetchMiddlewares<RequestHandler>(ActionController)),
            ...(fetchMiddlewares<RequestHandler>(ActionController.prototype.delete)),

            async function ActionController_delete(request: any, response: any, next: any) {
            const args = {
                    idAction: {"in":"path","name":"idAction","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ActionController>(ActionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/admin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.create)),

            async function AdminController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TCreateAdminInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminController>(AdminController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/admin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getPaginated)),

            async function AdminController_getPaginated(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"query","name":"name","dataType":"string"},
                    email: {"in":"query","name":"email","dataType":"string"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    pageSize: {"default":30,"in":"query","name":"pageSize","dataType":"double"},
                    orderBy: {"in":"query","name":"orderBy","dataType":"union","subSchemas":[{"dataType":"enum","enums":["name"]},{"dataType":"enum","enums":["email"]}]},
                    isDesc: {"in":"query","name":"isDesc","dataType":"union","subSchemas":[{"dataType":"enum","enums":["true"]},{"dataType":"enum","enums":["false"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminController>(AdminController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getPaginated.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/admin/:idAdmin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getById)),

            async function AdminController_getById(request: any, response: any, next: any) {
            const args = {
                    idAdmin: {"in":"path","name":"idAdmin","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminController>(AdminController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/admin/:idAdmin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.deleteById)),

            async function AdminController_deleteById(request: any, response: any, next: any) {
            const args = {
                    idAdmin: {"in":"path","name":"idAdmin","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminController>(AdminController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/admin/:idAdmin',
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.update)),

            async function AdminController_update(request: any, response: any, next: any) {
            const args = {
                    idAdmin: {"in":"path","name":"idAdmin","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TUpdateAdminInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminController>(AdminController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.login)),

            async function AuthController_login(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TLoginInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AuthController>(AuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/health/status',
            ...(fetchMiddlewares<RequestHandler>(HealthController)),
            ...(fetchMiddlewares<RequestHandler>(HealthController.prototype.getStatus)),

            async function HealthController_getStatus(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<HealthController>(HealthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getStatus.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/health/status/readiness',
            ...(fetchMiddlewares<RequestHandler>(HealthController)),
            ...(fetchMiddlewares<RequestHandler>(HealthController.prototype.statusAll)),

            async function HealthController_statusAll(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<HealthController>(HealthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.statusAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/segment/:idSegment',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.getById)),

            async function SegmentController_getById(request: any, response: any, next: any) {
            const args = {
                    idSegment: {"in":"path","name":"idSegment","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/segment/all/:idStory',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.getAllPaginated)),

            async function SegmentController_getAllPaginated(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
                    narrative: {"in":"query","name":"narrative","dataType":"string"},
                    tags: {"in":"query","name":"tags","dataType":"string"},
                    isFirst: {"in":"query","name":"isFirst","dataType":"boolean"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    pageSize: {"default":30,"in":"query","name":"pageSize","dataType":"double"},
                    orderBy: {"in":"query","name":"orderBy","dataType":"enum","enums":["narrative"]},
                    isDesc: {"in":"query","name":"isDesc","dataType":"union","subSchemas":[{"dataType":"enum","enums":["true"]},{"dataType":"enum","enums":["false"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllPaginated.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/segment',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.create)),

            async function SegmentController_create(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TCreateSegmentInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/segment/:idSegment',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.update)),

            async function SegmentController_update(request: any, response: any, next: any) {
            const args = {
                    idSegment: {"in":"path","name":"idSegment","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TUpdateSegmentInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.update.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/v1/segment/:idSegment',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.makeFirstSegment)),

            async function SegmentController_makeFirstSegment(request: any, response: any, next: any) {
            const args = {
                    idSegment: {"in":"path","name":"idSegment","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.makeFirstSegment.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/segment/:idSegment',
            ...(fetchMiddlewares<RequestHandler>(SegmentController)),
            ...(fetchMiddlewares<RequestHandler>(SegmentController.prototype.delete)),

            async function SegmentController_delete(request: any, response: any, next: any) {
            const args = {
                    idSegment: {"in":"path","name":"idSegment","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SegmentController>(SegmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.delete.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/v1/story',
            ...(fetchMiddlewares<RequestHandler>(StoryController)),
            ...(fetchMiddlewares<RequestHandler>(StoryController.prototype.create)),

            async function StoryController_create(request: any, response: any, next: any) {
            const args = {
                    httpRequest: {"in":"body","name":"httpRequest","required":true,"ref":"TCreateStoryInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StoryController>(StoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.create.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/story/random',
            ...(fetchMiddlewares<RequestHandler>(StoryController)),
            ...(fetchMiddlewares<RequestHandler>(StoryController.prototype.getRandom)),

            async function StoryController_getRandom(request: any, response: any, next: any) {
            const args = {
                    limit: {"default":5,"in":"query","name":"limit","dataType":"double"},
                    age: {"in":"query","name":"age","required":true,"dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StoryController>(StoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getRandom.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/story/:idStory',
            ...(fetchMiddlewares<RequestHandler>(StoryController)),
            ...(fetchMiddlewares<RequestHandler>(StoryController.prototype.getById)),

            async function StoryController_getById(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StoryController>(StoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/story/:idStory',
            ...(fetchMiddlewares<RequestHandler>(StoryController)),
            ...(fetchMiddlewares<RequestHandler>(StoryController.prototype.updateStory)),

            async function StoryController_updateStory(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
                    input: {"in":"body","name":"input","required":true,"ref":"TUpdateStoryInput"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StoryController>(StoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateStory.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/v1/story/:idStory',
            ...(fetchMiddlewares<RequestHandler>(StoryController)),
            ...(fetchMiddlewares<RequestHandler>(StoryController.prototype.deleteById)),

            async function StoryController_deleteById(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<StoryController>(StoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/tag/:idStory',
            ...(fetchMiddlewares<RequestHandler>(TagController)),
            ...(fetchMiddlewares<RequestHandler>(TagController.prototype.selectPagination)),

            async function TagController_selectPagination(request: any, response: any, next: any) {
            const args = {
                    idStory: {"in":"path","name":"idStory","required":true,"dataType":"string"},
                    name: {"in":"query","name":"name","dataType":"string"},
                    type: {"in":"query","name":"type","ref":"TagTypes"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    pageSize: {"default":30,"in":"query","name":"pageSize","dataType":"double"},
                    orderBy: {"in":"query","name":"orderBy","dataType":"union","subSchemas":[{"dataType":"enum","enums":["name"]},{"dataType":"enum","enums":["type"]},{"dataType":"enum","enums":["createdAt"]}]},
                    isDesc: {"in":"query","name":"isDesc","dataType":"union","subSchemas":[{"dataType":"enum","enums":["true"]},{"dataType":"enum","enums":["false"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TagController>(TagController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.selectPagination.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/v1/user-progress/all',
            ...(fetchMiddlewares<RequestHandler>(UserProgressController)),
            ...(fetchMiddlewares<RequestHandler>(UserProgressController.prototype.selectAll)),

            async function UserProgressController_selectAll(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    age: {"in":"query","name":"age","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserProgressController>(UserProgressController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.selectAll.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/user-progress',
            ...(fetchMiddlewares<RequestHandler>(UserProgressController)),
            ...(fetchMiddlewares<RequestHandler>(UserProgressController.prototype.updateProgress)),

            async function UserProgressController_updateProgress(request: any, response: any, next: any) {
            const args = {
                    body: {"in":"body","name":"body","required":true,"ref":"TUpsertPayload"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserProgressController>(UserProgressController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateProgress.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/v1/user-progress/finalize/:idProgress',
            ...(fetchMiddlewares<RequestHandler>(UserProgressController)),
            ...(fetchMiddlewares<RequestHandler>(UserProgressController.prototype.finalizeProgress)),

            async function UserProgressController_finalizeProgress(request: any, response: any, next: any) {
            const args = {
                    idProgress: {"in":"path","name":"idProgress","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserProgressController>(UserProgressController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.finalizeProgress.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
