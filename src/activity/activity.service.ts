import { Injectable } from '@nestjs/common';
import { Activity, NewActivity, Response } from '../interfaces/activityCollection.interface';

@Injectable()
export class ActivityService {

    createActivity(newActivity: NewActivity): Response {
        try {
            // TODO: Insert SQL Command
            console.log(newActivity);
            return {success: true}
        } catch(err) {
            return {success: false, message: err};
        }
    }

    readAllActivities(): Response {
        try {
            // TODO: Select SQL Command
            return {success: true, activities: [fakeActivity, fakeActivity, fakeActivity, fakeActivity]}
        } catch (err) {
            return {success: false, message: err};
        }
    }

    updateActivity(activityID: string, updatedActivity: NewActivity): Response {
        try {
            // TODO: Update SQL Command
            console.log(updatedActivity);
            return { success: true, activity: fakeActivity};
        } catch (err) {
            return {success: false, message: err};
        }
    }

    deleteActivity(activityID: string): Response {
        try {
            // TODO: Update SQL Command ActiveBit = 0
            return { success: true};
        } catch (err) {
            return { success: false, message: err};
        }
    }

}

export const fakeActivity: Activity = {
    activityID: '1234',
    name: 'Sports Event',
    categoryID: '1209aef'
}