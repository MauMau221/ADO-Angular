<?php
// Enable CORS to allow requests from Angular
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$query = $_SERVER['QUERY_STRING'] ?? '';

// Database connection parameters
$servername = "www.thyagoquintas.com.br:3306";
$username = "engenharia_52";
$password = "ema2";
$dbname = "engenharia_52";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    responseJson(['error' => "Conexão falhou: " . $conn->connect_error], 500);
    exit();
}

// Route handling based on request method and path
if ($method === 'GET') {
    if (isset($_GET['listar'])) {
        getPedidos($conn);
    } 
    elseif (isset($_GET['listarFilmes'])) {
        getFilmes($conn);
    }
    elseif (isset($_GET['id'])) {
        getPedidoById($conn, $_GET['id']);
    }
    elseif (isset($_GET['codigo']) && isset($_GET['email'])) {
        // Método GET para criar pedido - mantido para compatibilidade, mas POST é recomendado
        insertPedido($conn, $_GET['codigo'], $_GET['email']);
    }
    else {
        responseJson(['error' => 'Endpoint não encontrado'], 404);
    }
} 
elseif ($method === 'POST') {
    // Lê os dados enviados
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Verifica o tipo de ação (para compatibilidade com servidores que não suportam DELETE e PUT)
    if ($data && isset($data['acao'])) {
        if ($data['acao'] === 'excluir' && isset($data['id'])) {
            // Método POST como alternativa ao DELETE
            deletePedido($conn, $data['id']);
        }
        elseif ($data['acao'] === 'atualizar' && isset($data['id']) && isset($data['codigo']) && isset($data['email'])) {
            // Método POST como alternativa ao PUT
            updatePedido($conn, $data['id'], $data['codigo'], $data['email']);
        }
        else {
            responseJson(['error' => 'Ação inválida ou parâmetros insuficientes'], 400);
        }
    }
    elseif ($data && isset($data['codigo']) && isset($data['email'])) {
        // Método POST para criar pedido - RECOMENDADO
        insertPedido($conn, $data['codigo'], $data['email']);
    } 
    else {
        responseJson(['error' => 'Dados incompletos ou inválidos'], 400);
    }
} 
elseif ($method === 'PUT') {
    // Handle PUT requests for updates
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data && isset($data['id']) && isset($data['codigo']) && isset($data['email'])) {
        updatePedido($conn, $data['id'], $data['codigo'], $data['email']);
    } else {
        responseJson(['error' => 'Dados incompletos ou inválidos para atualização'], 400);
    }
}
elseif ($method === 'DELETE') {
    // Handle DELETE requests
    if (isset($_GET['id'])) {
        deletePedido($conn, $_GET['id']);
    } else {
        responseJson(['error' => 'ID não fornecido para exclusão'], 400);
    }
}
else {
    responseJson(['error' => 'Método não suportado'], 405);
}

// Close the connection
$conn->close();

// Function to get all pedidos
function getPedidos($conn) {
    $query = "SELECT * FROM pedidos";
    $result = $conn->query($query);
    
    $pedidos = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $pedidos[] = $row;
        }
    }
    
    responseJson($pedidos);
}

// Function to get a specific pedido by ID
function getPedidoById($conn, $id) {
    // Validate ID
    if (empty($id) || !is_numeric($id)) {
        responseJson(['error' => 'ID inválido'], 400);
        return;
    }
    
    // Escape value to prevent SQL injection
    $id = $conn->real_escape_string($id);
    
    $query = "SELECT * FROM pedidos WHERE id = '$id'";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        $pedido = $result->fetch_assoc();
        responseJson($pedido);
    } else {
        responseJson(['error' => 'Pedido não encontrado'], 404);
    }
}

// Function to get all filmes
function getFilmes($conn) {
    $query = "SELECT * FROM movie_rentals";
    $result = $conn->query($query);
    
    $filmes = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $filmes[] = $row;
        }
    }
    
    responseJson($filmes);
}

// Function to insert a new pedido
function insertPedido($conn, $codigo, $email) {
    // Validate data
    if (empty($codigo) || empty($email)) {
        responseJson(['error' => 'Código e email são obrigatórios'], 400);
        return;
    }
    
    // Escape values to prevent SQL injection
    $codigo = $conn->real_escape_string($codigo);
    $email = $conn->real_escape_string($email);
    
    $sql = "INSERT INTO pedidos (codigo, email) VALUES ('$codigo', '$email')";
    
    if ($conn->query($sql) === TRUE) {
        responseJson(['success' => 'Pedido criado com sucesso', 'id' => $conn->insert_id]);
    } else {
        responseJson(['error' => $conn->error], 500);
    }
}

// Function to update an existing pedido
function updatePedido($conn, $id, $codigo, $email) {
    // Validate data
    if (empty($id) || !is_numeric($id) || empty($codigo) || empty($email)) {
        responseJson(['error' => 'ID, código e email são obrigatórios'], 400);
        return;
    }
    
    // Escape values to prevent SQL injection
    $id = $conn->real_escape_string($id);
    $codigo = $conn->real_escape_string($codigo);
    $email = $conn->real_escape_string($email);
    
    $sql = "UPDATE pedidos SET codigo = '$codigo', email = '$email' WHERE id = '$id'";
    
    if ($conn->query($sql) === TRUE) {
        responseJson(['success' => 'Pedido atualizado com sucesso']);
    } else {
        responseJson(['error' => $conn->error], 500);
    }
}

// Function to delete a pedido
function deletePedido($conn, $id) {
    // Validate ID
    if (empty($id) || !is_numeric($id)) {
        responseJson(['error' => 'ID inválido'], 400);
        return;
    }
    
    // Escape value to prevent SQL injection
    $id = $conn->real_escape_string($id);
    
    $sql = "DELETE FROM pedidos WHERE id = '$id'";
    
    if ($conn->query($sql) === TRUE) {
        responseJson(['success' => 'Pedido excluído com sucesso']);
    } else {
        responseJson(['error' => $conn->error], 500);
    }
}

// Function to output JSON response
function responseJson($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
