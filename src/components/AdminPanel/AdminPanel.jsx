import { AdminForm } from "./AdminForm/AdminForm";
import "./AdminPanel.css";

export function AdminPanel() {
  return (
    <section className="admin">
      <div className="container">
        <div className="admin__wrapper">
          <AdminForm />
        </div>
      </div>
    </section>
  );
}
