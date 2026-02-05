import app from "./app.js";
import chalk from "chalk";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(chalk.green.bold(`✓ Server running at port ${PORT}`));
    console.log(chalk.cyan(`→ API endpoint: http://localhost:${PORT}`));
    console.log(chalk.yellow('⚡ Ready to accept requests...'));
});