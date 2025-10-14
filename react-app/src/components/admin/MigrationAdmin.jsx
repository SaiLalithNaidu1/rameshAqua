// Admin Migration Component
// Use this component to upload products to Firestore
// Access it at /admin/migration route

import { useState } from 'react';
import { Container, Row, Col, Button, Alert, Card, ProgressBar } from 'react-bootstrap';
import { runCompleteMigration, uploadCategories, uploadProducts } from '../../firebase/migration';
import './MigrationAdmin.css';

const MigrationAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFullMigration = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const migrationResult = await runCompleteMigration();
      
      if (migrationResult.success) {
        setResult(migrationResult);
      } else {
        setError(migrationResult.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoriesOnly = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const categoriesResult = await uploadCategories();
      
      if (categoriesResult.success) {
        setResult({ categories: categoriesResult });
      } else {
        setError(categoriesResult.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductsOnly = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const productsResult = await uploadProducts();
      
      if (productsResult.success) {
        setResult({ products: productsResult });
      } else {
        setError(productsResult.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="migration-admin">
      <Container className="py-5">
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">🚀 Firebase Migration Admin</h3>
              </Card.Header>
              <Card.Body>
                <Alert variant="warning">
                  <Alert.Heading>⚠️ Important Notice</Alert.Heading>
                  <p>
                    This will upload all product and category data to your Firestore database.
                    Make sure you have configured Firebase properly before proceeding.
                  </p>
                  <hr />
                  <p className="mb-0">
                    <strong>Note:</strong> This operation will create new documents in Firestore.
                    If documents already exist, they will be overwritten.
                  </p>
                </Alert>

                {loading && (
                  <div className="my-4">
                    <h5>Migration in progress...</h5>
                    <ProgressBar animated now={100} variant="primary" />
                    <p className="text-muted mt-2">
                      Please wait while we upload your data to Firestore...
                    </p>
                  </div>
                )}

                {result && (
                  <Alert variant="success" className="my-4">
                    <Alert.Heading>✅ Migration Successful!</Alert.Heading>
                    <p>{result.message}</p>
                    {result.categories && (
                      <p><strong>Categories:</strong> {result.categories.message}</p>
                    )}
                    {result.products && (
                      <p><strong>Products:</strong> {result.products.message}</p>
                    )}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="my-4">
                    <Alert.Heading>❌ Migration Failed</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                )}

                <div className="d-grid gap-3 mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleFullMigration}
                    disabled={loading}
                  >
                    {loading ? 'Migrating...' : '🚀 Run Complete Migration'}
                  </Button>

                  <Row className="g-3">
                    <Col md={6}>
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={handleCategoriesOnly}
                        disabled={loading}
                      >
                        📁 Upload Categories Only
                      </Button>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={handleProductsOnly}
                        disabled={loading}
                      >
                        📦 Upload Products Only
                      </Button>
                    </Col>
                  </Row>
                </div>

                <Card className="mt-4 bg-light">
                  <Card.Body>
                    <h5>📊 Migration Details:</h5>
                    <ul>
                      <li><strong>10 Categories</strong> will be uploaded</li>
                      <li><strong>56 Products</strong> will be uploaded</li>
                      <li>Each product includes: images, prices, descriptions, and metadata</li>
                      <li>Timestamps will be automatically added</li>
                    </ul>
                  </Card.Body>
                </Card>

                <Alert variant="info" className="mt-4">
                  <h6>📝 After Migration:</h6>
                  <ol>
                    <li>Check your Firebase Console to verify the data</li>
                    <li>Update your ProductsPage component to fetch from Firestore</li>
                    <li>Test all product and category pages</li>
                    <li>Remove this admin page in production</li>
                  </ol>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MigrationAdmin;
