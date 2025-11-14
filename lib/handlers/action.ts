'use server';

import { ZodError, type ZodSchema } from 'zod';

import { ValidationError } from '../http-errors';
import dbConnect from '../mongoose';

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  //   authorizeRole?: Roles | undefined;
};

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized.
// 3. Connecting to the database.
// 4. Returning the params and session.

async function action<T>({ params, schema }: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error('Schema validation failed');
      }
    }
  }

  //   if (authorizeRole) {
  //     const isAuthorized = await checkRole(authorizeRole);

  //     if (!isAuthorized) {
  //       return new UnauthorizedError(
  //         'You do not have permission to perform this action'
  //       );
  //     }
  //   }

  await dbConnect();

  return { params };
}

export default action;
