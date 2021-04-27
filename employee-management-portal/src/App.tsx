import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Button, Col, Container, ListGroup, ListGroupItem, Row, Spinner } from 'reactstrap';
import { NavbarComponent } from './components/Navbar';
import { IEmployee } from './models/IEmployee';
import { getEmployees } from './services/employee.service';
import { AddEmployeeForm } from './pages/AddEmployee';
import { string } from 'yup/lib/locale';
import { IHttpResponse } from './models/IHttpResponse';

function App() {
    const history = useHistory();
    const location = useLocation<{ detail: string; result: IHttpResponse }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [error, setError] = useState<string>('');

    let content: any = null;
    let notification: any = null;

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

    function renderEmployeeUi() {
        if (loading) setLoading(false);
        const employeeListItems = employees.map((employee: IEmployee) => {
            return (
                <ListGroupItem key={employee.id}>
                    {`${employee.first_name} ${employee.last_name}`}
                    <span className="float-right fake-link" role="link">
                        Delete
                    </span>
                    <span className="float-right fake-link" role="link">
                        Edit
                    </span>
                </ListGroupItem>
            );
        });
        content = <ListGroup>{employeeListItems}</ListGroup>;
    }

    if (error) {
        notification = <p className="text-danger">The following error occured: {error}</p>;
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
                            <p>Edit route</p>
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
