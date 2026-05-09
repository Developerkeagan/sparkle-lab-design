import { createFileRoute } from "@tanstack/react-router";
export { Route as AdminRoute } from "./admin.academy";
import { Route as A } from "./admin.academy";
export const Route = createFileRoute("/editor/academy")({ component: A.options.component! });