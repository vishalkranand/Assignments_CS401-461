package Assignment;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Objects;

public class Server {

    public static final String path_bash = "C:/Program Files/Git/bin/bash.exe";


    public static void main(String[] args) throws Exception {
        ServerSocket ss = new ServerSocket(4999);
        Socket s = ss.accept();

        System.out.println("client connected.");

        InputStreamReader in = new InputStreamReader(s.getInputStream());
        BufferedReader br = new BufferedReader(in);
        PrintWriter pr = new PrintWriter(s.getOutputStream());

        String str = br.readLine();
        StringBuilder result = new StringBuilder();

        ProcessBuilder processBuilder = new ProcessBuilder();
        if (Objects.equals(str, "0")) {
            //execute the ls command
            processBuilder.command(path_bash, "-c", "ls");
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );
            String line;
            while ((line = reader.readLine()) != null){
                result.append(line).append("\t");
            }
            int exitVal = process.waitFor();
            if (exitVal == 0) {
                pr.println(result);
            }else {
                pr.println("There is some error running that command");
            }
            pr.flush();
        } else {
            //execute the date command
            processBuilder.command(path_bash, "-c", "date");
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );
            String line;
            while ((line = reader.readLine()) != null){
                result.append(line + "\n");
            }
            int exitVal = process.waitFor();
            if (exitVal == 0) {
                pr.println(result);
            }else {
                pr.println("There is some error running that command");
            }
            pr.flush();
        }
    }
}
