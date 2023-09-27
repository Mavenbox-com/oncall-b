import { formEntityResponse } from './utils';
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use({
      typeDefs: `
        type Query {
          employedWorkSchedulesByToken(startDate: String, endDate: String): [EmployedWorkSchedule]
        }
        `,
      resolvers: {
        Query: {
          employedWorkSchedulesByToken: {
            resolve: async (parent, args, context) => {

              const userId = context.state.user.id;
              const data = await strapi.services['api::employed-work-schedule.employed-work-schedule'].find({
                filters: {
                  employed: userId,
                  schedule: {
                    day: {$between: [args.startDate, args.endDate]}
                  }
                },
              });

              for (const employedWork of data.results) {
                const employWorkId = employedWork.id;
                const shiftData = await strapi.services['api::work-shift.work-shift'].find({ filters: { employed_work_schedules : employWorkId }, });
                formEntityResponse(employedWork,shiftData,'shift');
                const scheduleData = await strapi.services['api::work-schedule.work-schedule'].find({ filters: { employed_work_schedules : employWorkId }, });
                formEntityResponse(employedWork,scheduleData,'schedule');
              }
              return data.results;
            },
          },
        }
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
