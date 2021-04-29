import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Button, Col, Container, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { NavbarComponent } from './components/Navbar';
import { IEmployee } from './models/IEmployee';
import { deleteEmployee, getEmployees } from './services/employee.service';
import { AddEmployeeForm } from './pages/AddEmployee';
import { IHttpResponse } from './models/IHttpResponse';
import { EditEmployeeForm } from './pages/EditEmployee';

function App() {
    const history: any = useHistory();
    const location = useLocation<{ detail: string; result: IHttpResponse }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [error, setError] = useState<string>('');

    let content = null;
    let notification: any = null;

    console.log('43747802478487092348790', process.env);

    useEffect(() => {
        setLoading(true);
        getAllEmployees();
    }, []);

    useEffect(() => {
        getAllEmployees();
    }, [location?.state?.detail]);

    const getAllEmployees = async () => {
        const employees = await getEmployees();
        if (employees?.error?.message) {
            setError(employees?.error?.message);
        }

        if (employees?.status === 200 && employees?.data?.content.length > 0) {
            setEmployees(employees?.data?.content);
        }
    };

    async function deleteEmployeeHandler(employeeId: number) {
        await deleteEmployee(employeeId);
        await getAllEmployees();
    }

    function renderEmployeeUi() {
        if (loading) setLoading(false);
        if (employees.length > 0) {
            const employeeListItems = employees.map((employee: IEmployee) => {
                return (
                    <ListGroupItem key={employee.id}>
                        {`${employee.first_name} ${employee.last_name}`}
                        <span
                            className="float-right fake-link"
                            role="link"
                            onClick={() => deleteEmployeeHandler(employee.id)}
                        >
                            Delete
                        </span>
                        <span
                            className="float-right fake-link"
                            role="link"
                            onClick={() => history.push({ pathname: '/edit', state: { employee } })}
                        >
                            Edit
                        </span>
                    </ListGroupItem>
                );
            });
            content = <ListGroup>{employeeListItems}</ListGroup>;
        }
    }

    console.log('---00', location?.state?.result);

    if (error) {
        notification = <p className="text-danger">The following error occured: {error}</p>;
    } else if (location?.state?.result?.status === 201 && !error) {
        notification = <p className="text-success">Employee added.</p>;
    } else if (location?.state?.result?.status === 200 && !error) {
        notification = <p className="text-success">Employee updated.</p>;
    }

    if (loading) {
        content = <Spinner />;
    }

    if (employees.length > 0) {
        renderEmployeeUi();
    }

    return (
        <div className="App">
            <NavbarComponent />

            <Container>
                <Switch>
                    <Route path="/add">
                        <Row className="mt-5 mb-5">
                            <AddEmployeeForm />
                        </Row>
                    </Route>

                    <Route path="/edit">
                        <Row className="mt-5 mb-5">
                            <EditEmployeeForm />
                        </Row>
                    </Route>

                    <Route path="/">
                        <Row className="mt-5 mb-5">
                            <Col md={{ size: 3, offset: 9 }}>
                                <div className="float-right">
                                    <Button color="primary" onClick={() => history.push('/add')}>
                                        Add employee
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                {notification}
                                {content}
                            </Col>
                        </Row>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
