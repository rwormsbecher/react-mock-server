
import { IEmployee } from './../models/IEmployee';
import { IHttpResponse } from './../models/IHttpResponse';
import { IEmployeeCreateVm } from './../models/IEmployeeCreateVm';

/**
 * returns all employees or an error.
 * @constructor
 */
export const getEmployees = async() => {
    try {
        const employeesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/employees`);

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


/**
 * creates a new employee.
 * @constructor
 * @param body --- contains the IEmployee interface to create a new employee object.
 * @param history --- contains the history of object from the sending component to be able to navigate back to the homepage.
 */
export const createEmployee = async (body: IEmployeeCreateVm, history: any) => {
    try {
        const employeesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (employeesResponse.status !== 201) {
            const response: IHttpResponse = {
                status: employeesResponse.status,
                error: {message: employeesResponse.statusText},
                data: {content: ''}
            }
            return response
        }

        const employeeResponse: IEmployee[] = await employeesResponse.json();
        const employeeResult: IHttpResponse = {
            status: employeesResponse.status,
            error: {message: ''},
            data: {content: employeeResponse}
        }

        history.push({
            pathname: '/',
            state: { detail: 'reload', result: employeeResult },
        });
        
    } catch (error) {
        const response: IHttpResponse = {
            status: error.status,
            error: {message: error.statusText},
            data: {content: ''}
        }
        return response;
    }
}


/**
 * edits an employee.
 * @constructor
 * @param body --- contains the IEmployee interface to edit an employee object.
 * @param history --- contains the history of object from the sending component to be able to navigate back to the homepage.
 */
 export const editEmployee = async (body: IEmployee, history: any) => {
    try {
        const employeesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/employees/${body?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (employeesResponse.status !== 200) {
            const response: IHttpResponse = {
                status: employeesResponse.status,
                error: {message: employeesResponse.statusText},
                data: {content: ''}
            }
            return response
        }

        const employeeResponse: IEmployee[] = await employeesResponse.json();
        const employeeResult: IHttpResponse = {
            status: employeesResponse.status,
            error: {message: ''},
            data: {content: employeeResponse}
        }

        history.push({
            pathname: '/',
            state: { detail: 'reload', result: employeeResult },
        });
        
    } catch (error) {
        const response: IHttpResponse = {
            status: error.status,
            error: {message: error.statusText},
            data: {content: ''}
        }
        return response;
    }
}




/**
 * edits an employee.
 * @constructor
 * @param employeeId --- contains the employeeId to delete an employee object.
 * @param  --- contains the history of object from the sending component to be able to navigate back to the homepage.
 */
 export const deleteEmployee = async (employeeId: number) => {
    try {
        const employeesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/employees/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (employeesResponse.status !== 200) {
            const response: IHttpResponse = {
                status: employeesResponse.status,
                error: {message: employeesResponse.statusText},
                data: {content: ''}
            }
            return response
        }

        const employeeResult: IEmployee[] = await employeesResponse.json();

        // I disagree with json -server that a delete returns a 200, isntead it should be 204: no-content
        const response: IHttpResponse = {
            status: 204,
            error: {message: ''},
            data: {content: employeeResult}
        }
        return response;


        
    } catch (error) {
        const response: IHttpResponse = {
            status: error.status,
            error: {message: error.statusText},
            data: {content: ''}
        }
        return response;
    }
}