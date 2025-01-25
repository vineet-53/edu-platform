import { AxiosResponse } from "axios";
import { course } from "../endpoints";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { AppDispatch } from "../../store/store";
import { setCourse } from "../../store/slices/course.slice";

export function fetchFullCourseDetails<T>(courseId: T) {
	return async (dispatch: AppDispatch) => {
		try {
			const response: AxiosResponse = await apiConnector(
				course.GET_FULL_COURSE_DETAILS.method,
				`${course.GET_FULL_COURSE_DETAILS.url}?courseId=${courseId}`
			);
			toast.success("Fetched Course Details");
			dispatch(setCourse(response.data.course));
		} catch (err: any) {
			console.log(err.message);
			toast.error(err.message || err);
		}
	};
}

export const getCompletedVideos = async (courseId: string) => {
	try {
		const response = await apiConnector(
			course.GET_COMPLETED_VIDEOS.method,
			`${course.GET_COMPLETED_VIDEOS.url}?courseId=${courseId}`
		);
		if (!response.data.success) {
			throw response.data;
		}
		console.log(response.data);
		return response.data.completedVideos;
	} catch (err: any) {
		console.error(err?.message || err);
	}
	return [];
};

export const updateCourseProgress = async (
	courseId: string,
	subSectionId: string
) => {
	try {
		const response: AxiosResponse = await apiConnector(
			course.UPDATE_COURSE_PROGRESS.method,
			course.UPDATE_COURSE_PROGRESS.url,
			{ courseId, subSectionId }
		);
		console.log(response.data.message);
		return response.data.completedVideos
	} catch (err: any) {
		console.error(err?.message || err);
	}
};

export const  removeFromCourseProgress = async (
	courseId : string , 
	subSectionId : string
) => { 
	try {
		const response: AxiosResponse = await apiConnector(
			course.REMOVE_COURSE_PROGRESS.method,
			course.REMOVE_COURSE_PROGRESS.url,
			{ courseId, subSectionId }
		);
		console.log(response.data.message);
		return response.data.completedVideos
	} catch (err: any) {
		console.error(err?.message || err);
	}
	return []
}