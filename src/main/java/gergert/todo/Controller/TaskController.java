package gergert.todo.Controller;

import gergert.todo.Model.Task;
import gergert.todo.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/tasks")
    public String showTasks(Model model) {
        model.addAttribute("user", taskService.getCurrentUser());
        model.addAttribute("tasks", taskService.getUserTasks());
        model.addAttribute("newTask", new Task());
        return "tasks";
    }

    @PostMapping("/tasks/add")
    public String addTask(@ModelAttribute Task task, RedirectAttributes redirectAttributes) {
        taskService.saveTask(task);
        redirectAttributes.addAttribute("taskAdded", true);
        return "redirect:/tasks";
    }

    @GetMapping("/tasks/delete/{id}")
    public String deleteTask(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        taskService.deleteTask(id);
        redirectAttributes.addAttribute("taskDeleted", true);
        return "redirect:/tasks";
    }

    @PostMapping("/tasks/update/{id}")
    public String editTask(@PathVariable Long id,@ModelAttribute Task task, RedirectAttributes redirectAttributes) {
        task.setId(id);
        taskService.updateTask(task);
        redirectAttributes.addAttribute("taskUpdated", true);
        return "redirect:/tasks";
    }

    @GetMapping("/tasks/toggle/{id}")
    public String toggleTask(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        Task task = taskService.getTaskById(id);
        taskService.toggleCompleted(id);
        if (task != null && !task.isCompleted()) {
            redirectAttributes.addAttribute("taskCompleted", true);
        } else {
            redirectAttributes.addAttribute("taskResumed", true);
        }
        return "redirect:/tasks";
    }

}
