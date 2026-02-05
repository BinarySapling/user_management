import app from "./app.js";
import chalk from "chalk";

const PORT =  process.env.PORT_NO || 3000
app.listen(3000,()=>{
    console.log(chalk.green.bold('✓ Server running at port 3000'));
    console.log(chalk.cyan('→ API endpoint: http://localhost:3000'));
    console.log(chalk.yellow('⚡ Ready to accept requests...'));
})