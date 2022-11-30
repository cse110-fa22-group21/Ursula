## Date 
November 4
## Problem Description  
The information you want to display on the log page is not suitable for user.  

## Options considered and Pros & Cons  
**[Selected] Limits the information displayed on the log page to the task completion time only.**  
The UI design is simplified by displaying only the information the majority of users want.  
User cannot access other information that is not displayed.  

**Among the information displayed on the log page, only the main information(task completion time) is displayed,  
and the secondary information is hidden at the bottom of the detail.**  
The user can access all information without complicating the UI design.  
Creating this feature for some users is too costly.  

## the driving force behind decision-making  
Seeking to save developers' precious time  
Selectively provide users with the information they need  

## Solution
The Log page that is displayed to the user only displays the end time of the job, and saves the entire time log as a Beck and Log.

## Features & Priorities
Limits the type displayed on the Log page to finish type.
Saves all types of time logs (add, start, and finish) on the backend log page.

## Link
https://github.com/cse110-fa22-group21/cse110-fa22-group21/blob/main/admin/meetings/102922-pitchmeeting3.md
