
import { IEmployee } from './../models/IEmployee';
import { IHttpResponse } from './../models/IHttpResponse';

/**
 * returns all employees or an error.
 * @constructor
 */
export const getEmployees = async() => {
    try {
        const employeesResponse = await fetch("http://localhost:3000/employees");

        if (employeesResponse.status !== 200) {
            const response: IHttpResponse = {
                status: employeesResponse.status,
                error: {message: employeesResponse.statusText},
                data: {content: ''}
            }
            return response
        }

        const employeeResult: IEmployee[] = await employeesResponse.json();

        const response: IHttpResponse = {
            status: employeesResponse.status,
            error: {message: ''},
            data: {content: employeeResult}
        }
        return response
    } catch (error) {
        const response: IHttpResponse = {
            status: error.status,
            error: {message: error.statusText},
            data: {content: ''}
        }
        return response
    }
}

