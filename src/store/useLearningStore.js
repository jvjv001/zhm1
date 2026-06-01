import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLearningStore = create(
  persist(
    (set, get) => ({
      // 用户名
      userName: '数据分析同学',
      setUserName: (name) => set({ userName: name }),
      
      // 用户头像（base64格式）
      userAvatar: null,
      setUserAvatar: (avatarData) => set({ userAvatar: avatarData }),
      
      // 学习日期和连续天数
      firstStudyDate: null,
      lastStudyDate: null,
      consecutiveDays: 0,
      
      // 总学习时长（分钟）
      totalStudyMinutes: 0,
      addStudyTime: (minutes) => {
        set((state) => ({
          totalStudyMinutes: state.totalStudyMinutes + minutes
        }))
      },
      
      // 更新学习日期
      updateStudyDate: () => {
        const today = new Date().toISOString().split('T')[0]
        const state = get()
        
        let newFirstStudyDate = state.firstStudyDate
        if (!newFirstStudyDate) {
          newFirstStudyDate = today
        }
        
        let newConsecutiveDays = state.consecutiveDays
        const lastDate = state.lastStudyDate
        
        if (lastDate !== today) {
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]
          
          newConsecutiveDays = lastDate === yesterdayStr ? state.consecutiveDays + 1 : 1
        }
        
        set({
          firstStudyDate: newFirstStudyDate,
          lastStudyDate: today,
          consecutiveDays: newConsecutiveDays
        })
      },

      // 学习活动记录
      activityLog: [],
      addActivity: (activity) => {
        set((state) => ({
          activityLog: [
            {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              ...activity
            },
            ...state.activityLog
          ].slice(0, 50) // 保留最近50条记录
        }))
      },
      
      // 已完成的课程
      completedCourses: [],
      markCourseComplete: (topicId) => {
        set((state) => {
          if (!state.completedCourses.includes(topicId)) {
            get().updateStudyDate()
            get().addStudyTime(30) // 完成课程增加30分钟学习时长
            get().addActivity({
              type: 'course',
              action: 'complete',
              topicId: topicId,
              title: topicId
            })
            return {
              completedCourses: [...state.completedCourses, topicId]
            }
          }
          return state
        })
      },
      
      // 已完成的项目
      completedProjects: [],
      markProjectComplete: (projectId) => {
        set((state) => {
          if (!state.completedProjects.includes(projectId)) {
            get().updateStudyDate()
            get().addStudyTime(45) // 完成项目增加45分钟学习时长
            get().addActivity({
              type: 'project',
              action: 'complete',
              projectId: projectId,
              title: projectId
            })
            return {
              completedProjects: [...state.completedProjects, projectId]
            }
          }
          return state
        })
      },
      
      // 练习成绩
      quizScores: {},
      saveQuizScore: (topicId, score) => {
        set((state) => {
          get().updateStudyDate()
          get().addStudyTime(20) // 完成测验增加20分钟学习时长
          get().addActivity({
            type: 'quiz',
            action: 'complete',
            topicId: topicId,
            score: score,
            title: topicId
          })
          return {
            quizScores: {
              ...state.quizScores,
              [topicId]: {
                score,
                date: new Date().toISOString()
              }
            }
          }
        })
      },

      // 答题记录
      quizAnswers: {},
      saveQuizAnswer: (topicId, questionId, userAnswer, isCorrect) => {
        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [topicId]: {
              ...(state.quizAnswers[topicId] || {}),
              [questionId]: {
                userAnswer,
                isCorrect,
                answeredAt: new Date().toISOString()
              }
            }
          }
        }))
      },

      // 清除某个主题的答题记录
      clearTopicAnswers: (topicId) => {
        set((state) => {
          const newQuizAnswers = { ...state.quizAnswers }
          delete newQuizAnswers[topicId]
          return { quizAnswers: newQuizAnswers }
        })
      },
      
      // 获取成就徽章
      getAchievements: () => {
        const state = get()
        const badges = [
          { 
            id: 'beginner', 
            name: '入门新秀', 
            icon: '🥇', 
            description: '完成第1个知识点',
            unlocked: state.completedCourses.length >= 1,
            color: 'gold'
          },
          { 
            id: 'coder', 
            name: '代码勇士', 
            icon: '🥈', 
            description: '完成3个编程项目',
            unlocked: state.completedProjects.length >= 3,
            color: 'silver'
          },
          { 
            id: 'analyst', 
            name: '分析达人', 
            icon: '🥉', 
            description: '练习测评正确率达80%',
            unlocked: (() => {
              const quizScoresList = Object.values(state.quizScores);
              if (quizScoresList.length === 0) return false;
              const averageScore = quizScoresList.reduce((sum, s) => sum + s.score, 0) / quizScoresList.length;
              return averageScore >= 80;
            })(),
            color: 'bronze'
          },
          { 
            id: 'master', 
            name: '全能学霸', 
            icon: '🎯', 
            description: '完成所有12个知识点',
            unlocked: state.completedCourses.length >= 12,
            color: 'purple'
          }
        ];
        return badges;
      },

      // 检查新解锁的徽章
      checkNewAchievements: () => {
        const state = get();
        const currentBadges = state.getAchievements();
        const newlyUnlocked = currentBadges.filter(badge => badge.unlocked);
        return newlyUnlocked;
      },
      
      // 重置进度
      resetProgress: () => {
        set({
          completedCourses: [],
          completedProjects: [],
          quizScores: {},
          quizAnswers: {},
          activityLog: [],
          firstStudyDate: null,
          lastStudyDate: null,
          consecutiveDays: 0,
          totalStudyMinutes: 0
        })
      },
      
      // 导出学习数据
      exportLearningData: () => {
        const state = get()
        return JSON.stringify({
          userName: state.userName,
          userAvatar: state.userAvatar,
          completedCourses: state.completedCourses,
          completedProjects: state.completedProjects,
          quizScores: state.quizScores,
          quizAnswers: state.quizAnswers,
          activityLog: state.activityLog,
          firstStudyDate: state.firstStudyDate,
          lastStudyDate: state.lastStudyDate,
          consecutiveDays: state.consecutiveDays,
          totalStudyMinutes: state.totalStudyMinutes,
          achievements: state.getAchievements(),
          exportDate: new Date().toISOString()
        }, null, 2)
      }
    }),
    {
      name: 'panda-learn-storage'
    }
  )
)
