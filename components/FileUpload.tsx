"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, AlertCircle, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const PAGE_SIZE_OPTIONS = [10, 50, 100, 200] as const
type PageSize = typeof PAGE_SIZE_OPTIONS[number]
const MAX_FILES = 5

type FileData = {
  file: File
  id: string
  progress: number
  isUploading: boolean
  csvData: string[][]
  showTable: boolean
  error?: string
  currentPage: number
}

type FileUploadProps = {
  maxSize?: number
  allowedTypes?: string[]
}

const FileUpload = ({
  maxSize = 5,
  allowedTypes = [".csv", ".pdf"],
}: FileUploadProps) => {
  const [files, setFiles] = useState<FileData[]>([])
  const [pageSize, setPageSize] = useState<PageSize>(10)
  const [error, setError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setError("")

    if (files.length + selectedFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed`)
      return
    }

    const newFiles = selectedFiles.map(file => {
      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`${file.name} exceeds ${maxSize}MB limit`)
        return null
      }

      // Validate file type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
      if (!allowedTypes.includes(fileExtension)) {
        setError(`${file.name} must be ${allowedTypes.join(" or ")}`)
        return null
      }

      return {
        file,
        id: crypto.randomUUID(),
        progress: 0,
        isUploading: false,
        csvData: [],
        showTable: false,
        currentPage: 1,
      }
    }).filter((file): file is NonNullable<typeof file> => file !== null)

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleDelete = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const handleView = (id: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, showTable: !f.showTable } : f
    ))
  }

  const handlePageChange = (id: string, page: number) => {
    setFiles(prev => prev.map(f =>
      f.id === id ? { ...f, currentPage: page } : f
    ))
  }

  const handleUploadAll = async () => {
    if (files.length === 0) return
    setIsUploading(true)

    // Start upload for all files that haven't been uploaded
    const unuploadedFiles = files.filter(f => f.progress === 0)
    
    for (const fileData of unuploadedFiles) {
      setFiles(prev => prev.map(f => 
        f.id === fileData.id ? { ...f, isUploading: true, progress: 0 } : f
      ))

      // Simulate upload progress
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          setFiles(prev => prev.map(f => {
            if (f.id !== fileData.id) return f
            if (f.progress >= 100) {
              clearInterval(interval)
              resolve()
              return { ...f, progress: 100 }
            }
            return { ...f, progress: f.progress + 10 }
          }))
        }, 500)

        // If it's a CSV file, read and parse it
        if (fileData.file.name.endsWith(".csv")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const text = e.target?.result as string
            const rows = text.split("\n").map((row) => row.split(","))
            setFiles(prev => prev.map(f => 
              f.id === fileData.id ? { 
                ...f, 
                csvData: rows,
                progress: 100,
                isUploading: false 
              } : f
            ))
            clearInterval(interval)
            resolve()
          }
          reader.readAsText(fileData.file)
        } else {
          // For PDF files, just simulate upload
          setTimeout(() => {
            clearInterval(interval)
            setFiles(prev => prev.map(f => 
              f.id === fileData.id ? { ...f, progress: 100, isUploading: false } : f
            ))
            resolve()
          }, 3000)
        }
      })
    }

    setIsUploading(false)
  }

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value) as PageSize
    setPageSize(newSize)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="space-y-2 p-4 md:p-6">
        <CardTitle className="text-xl md:text-3xl">Upload your statement</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Upload up to {MAX_FILES} files (Max {maxSize}MB each)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 md:p-6">
        {files.length < MAX_FILES && (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-40 md:h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center px-2 py-4 md:px-4 md:py-6">
                <Upload className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-gray-400" />
                <p className="mb-1 md:mb-2 text-sm md:text-base text-gray-500 text-center">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  {allowedTypes.join(", ")} (up to {maxSize}MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
                accept={allowedTypes.join(",")}
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {files.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            {files.some(f => f.progress === 0) && (
              <Button
                onClick={handleUploadAll}
                disabled={isUploading}
                className="w-full text-sm md:text-base py-3 md:py-6"
              >
                {isUploading ? "Uploading..." : "Upload All Files"}
              </Button>
            )}

            {files.map(fileData => {
              const totalPages = Math.ceil((fileData.csvData.length - 1) / pageSize)
              const startIndex = (fileData.currentPage - 1) * pageSize + 1
              const endIndex = Math.min(startIndex + pageSize, fileData.csvData.length)

              return (
                <div key={fileData.id} className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg gap-1.5 sm:gap-4">
                    <div className="flex items-center gap-2 md:gap-4 min-w-0">
                      <p className="text-sm md:text-base font-medium text-gray-600 truncate">
                        {fileData.file.name}
                      </p>
                      {fileData.progress > 0 && fileData.progress < 100 && (
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {fileData.progress}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {!fileData.isUploading && fileData.progress === 100 && fileData.file.name.endsWith(".csv") && (
                        <Button
                          onClick={() => handleView(fileData.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 min-w-[80px]"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="hidden sm:inline">{fileData.showTable ? "Hide" : "View"}</span>
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(fileData.id)}
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2 min-w-[80px]"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>

                  {fileData.isUploading && (
                    <Progress value={fileData.progress} className="w-full" />
                  )}

                  {fileData.showTable && fileData.csvData.length > 0 && (
                    <div className="space-y-3 md:space-y-4">
                      <div className="border rounded-lg">
                        <div className="max-h-[350px] md:max-h-[400px] overflow-auto">
                          <table className="w-full text-xs md:text-sm">
                            <thead className="bg-gray-100 sticky top-0">
                              <tr>
                                <th className="px-1.5 md:px-4 py-1.5 md:py-2 text-left font-medium text-gray-600 whitespace-nowrap">
                                  #
                                </th>
                                {fileData.csvData[0]?.map((header, i) => (
                                  <th
                                    key={i}
                                    className="px-1.5 md:px-4 py-1.5 md:py-2 text-left font-medium text-gray-600 whitespace-nowrap"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {fileData.csvData.slice(startIndex, endIndex).map((row, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50">
                                  <td className="px-1.5 md:px-4 py-1.5 md:py-2 text-gray-500 whitespace-nowrap">
                                    {startIndex + i}
                                  </td>
                                  {row.map((cell, j) => (
                                    <td key={j} className="px-1.5 md:px-4 py-1.5 md:py-2 whitespace-nowrap">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 px-1 md:px-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                          <Select
                            value={pageSize.toString()}
                            onValueChange={handlePageSizeChange}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Rows per page" />
                            </SelectTrigger>
                            <SelectContent>
                              {PAGE_SIZE_OPTIONS.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                  {size} rows
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-sm text-gray-600 whitespace-nowrap">
                            Showing {startIndex} to {endIndex} of {fileData.csvData.length - 1} entries
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(fileData.id, Math.max(1, fileData.currentPage - 1))}
                            disabled={fileData.currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-sm whitespace-nowrap">
                            Page {fileData.currentPage} of {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(fileData.id, Math.min(totalPages, fileData.currentPage + 1))}
                            disabled={fileData.currentPage === totalPages}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default FileUpload 