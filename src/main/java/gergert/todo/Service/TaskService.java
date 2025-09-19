package gergert.todo.Service;

import gergert.todo.Model.Task;
import gergert.todo.Model.User;
import gergert.todo.repository.TaskRepository;
import gergert.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }

    public List<Task> getUserTasks() {
        User user = getCurrentUser();
        return taskRepository.findByUser(user);
    }

    public Task saveTask(Task task) {
        User user = getCurrentUser();
        task.setUser(user);

        return taskRepository.save(task);
    }

    public void updateTask(Task updatedTask) {
        Optional<Task> existingTaskOpt = taskRepository.findById(updatedTask.getId());
        if (existingTaskOpt.isPresent()) {
            Task existingTask = existingTaskOpt.get();
            if (existingTask.getUser().getId().equals(getCurrentUser().getId())) {
                existingTask.setName(updatedTask.getName());
                existingTask.setDescription(updatedTask.getDescription());
                existingTask.setDeadline(updatedTask.getDeadline());
                taskRepository.save(existingTask);
            }
        }
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    public void toggleCompleted(Long id) {
        Task task = getTaskById(id);
        if (task != null) {
            task.setCompleted(!task.isCompleted());
            taskRepository.save(task);
        }
    }
}
